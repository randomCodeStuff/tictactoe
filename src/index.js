import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }
  async handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = this.state.squares.slice();
    //disable click for won game or already clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    await this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: false,
    });
    let move = bestAIMove(squares); //in order checked;
    squares[move] = this.state.xIsNext ? 'X' : 'O';
    await this.setState({
      history:
        history.concat[
          {
            squares: squares,
          }
        ],
      xIsNext: true,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

let scores = {
  T: 0,
  O: 10,
  X: -10,
  null: null,
};

//for alpha beta, best scores are edges and middle
let intermediateScores = {
  0: 10,
  1: -10,
  2: 10,
  3: -10,
  4: 10,
  5: -10,
  6: 10,
  7: -10,
  8: 10,
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let xinarray = squares.filter((x) => x === 'X').length;
  let oinarray = squares.filter((o) => o === 'O').length;

  if (xinarray === 5 || oinarray === 5) {
    return 'T';
  }
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

    // if (!squares.includes(null)) {
    //   return 'T';
    // }
  }
  return null;
}

function bestAIMove(squares) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      let score = minimaxAlphaBeta(squares, false, 8, -Infinity, Infinity);
      if (score === null) {
        score = intermediateScores[i]; //
      }
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimaxAlphaBeta(board, isMaximizing, depth, alpha, beta) {
  let result = calculateWinner(board);
  if (depth === 0) {
    console.log('returning because max debth reached');
    return null; //in bestAImove null will use intermediateScores
  }
  let numberOfNulls = board.filter((word) => word === null).length;
  if (result || numberOfNulls === 0) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = 'O';
        let score = minimaxAlphaBeta(board, false, depth - 1, alpha, beta);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  } //if (!isMaximizing)
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = 'X';
        let score = minimaxAlphaBeta(board, true, depth - 1, alpha, beta);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  }
}
