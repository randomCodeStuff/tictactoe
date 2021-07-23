import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let scores = {
  null: null,
  O: -1,
  X: 1,
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

  AIminimax(board, depth, isMaximising) {
    //let clone = [...board];
    let result = scores[calculateWinner(board)];
    console.log(result);
    console.log(board);

    if (result) {
      return result;
    }

    if (isMaximising) {
      let max = -Infinity;
      if (board.includes(null)) {
        let amove = this.AIplayerRandom(board);
        board[amove] = this.state.xIsNext ? 'X' : 'O';
        let score = this.AIminimax(board, depth + 1, false);
        if (score > max) {
          max = score;
        }
      }
      return max;
    } else {
      let min = Infinity;
      if (board.includes(null)) {
        let amove = this.AIplayerRandom(board);
        board[amove] = this.state.xIsNext ? 'X' : 'O';
        let score = this.AIminimax(board, depth + 1, true);
        if (score < min) {
          min = score;
        }
      }
      return min;
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    //disable click for won game or already clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (this.state.xIsNext) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      //this.state.xIsNext = !this.state.xIsNext;
      //this.xIsNext = !this.xIsNext;

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      let move = this.AIplayerRandom(squares);
      squares[move] = !this.state.xIsNext ? 'X' : 'O';
    }

    //let notyetamove = this.AIminimax(squares, 3, true);
    //console.log(notyetamove);
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
  }
  return null;
}
