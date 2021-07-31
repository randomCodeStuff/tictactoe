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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  async handleClick(i) {
    const squares = this.state.squares.slice();
    //disable click for won game or already clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    await this.setState({
      xIsNext: false,
      squares: squares,
    });
    let move = bestAIMove(squares); //in order checked;
    squares[move] = this.state.xIsNext ? 'X' : 'O';
    await this.setState({
      xIsNext: true,
      squares: squares,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    //const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    if (winner) {
      status = 'winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    if (!squares.includes(null)) {
      return 'T';
    }
  }
  return null;
}

function minimax(board, isMaximizing, depth) {
  if (depth === 9) {
    console.log('returning null because max debth reached');
    return null;
  }
  let result = calculateWinner(board);
  let numberOfNulls = board.filter((word) => word === null).length;
  if (result || numberOfNulls === 0) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = 'O';
        let score = minimax(board, false, depth + 1);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } //if (!isMaximizing)
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = 'X';
        let score = minimax(board, true, depth + 1);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function bestAIMove(squares) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      //let score = minimax(squares, false, 0);
      let score = minimaxAlphaBeta(squares, false, 8, -Infinity, Infinity);
      if (score === null) {
        score = intermediateScores[i]; //
      }
      //console.log('score in bestAImove: ' + score + 'for move ' + i);
      squares[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  console.log('the best move is:' + move);
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
