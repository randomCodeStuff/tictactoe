import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let scores = {
  T: 0,
  O: -10,
  X: 10,
};

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

  AIplayerRandom(board) {
    if (!board.includes(null)) {
      return;
    }
    let move = Math.floor(Math.random() * 9);
    if (board[move] === null) {
      // this.setState({
      //   xIsNext: !this.state.xIsNext,
      // });
      //this.state.xIsNext = !this.state.xIsNext;
      return move;
    } else {
      return this.AIplayerRandom(board);
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    //disable click for won game or already clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.state.xIsNext = !this.state.xIsNext;
    this.setState({
      //xIsNext: !this.state.xIsNext,
      squares: squares,
    });
    //this.state.xIsNext = !this.state.xIsNext;
    //}
    //let move = this.AIplayerRandom(squares);
    //squares[move] = !this.state.xIsNext ? 'X' : 'O';
    //let score = this.minimax(squares, 0, false, 0, 0);
    //console.log(score);
    let move = bestAIMove(squares);
    squares[move] = this.state.xIsNext ? 'X' : 'O';
    this.state.xIsNext = !this.state.xIsNext;
    // this.setState({
    //   xIsNext: !this.state.xIsNext,
    //   squares: squares,
    // });
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
    return null; //a failsafe to keep this from recursing forever
  }
  let result = calculateWinner(board);
  let numberOfNulls = board.filter((word) => word === null).length;
  if (result || numberOfNulls === 0) {
    //console.log('in exiting if score = :' + scores[result]);
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = 'x';
        let score = minimax(board, false, depth + 1);
        board[i] = null;
        //bestScore = Math.max(score, bestScore);
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  } //if (!isMaximizing)
  else {
    //console.log('in minimising');
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        //console.log(i);
        board[i] = 'O';
        //console.log(board);
        let score = minimax(board, true, depth + 1);
        board[i] = null;
        //bestScore = Math.min(score, bestScore);
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}

function bestAIMove(squares) {
  console.log(squares);
  let bestScore = Infinity;

  let move;
  for (let i = 0; i < 9; i++) {
    //console.log(squares[i]);
    if (squares[i] === null) {
      squares[i] = 'O';
      let score = minimax(squares, false, 0);
      console.log('score in bestAImove: ' + score + 'for move ' + i);
      squares[i] = null;
      if (score < bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  console.log('the best move is:' + move);
  return move;
}
