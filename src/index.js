import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let scores = {
  null: 0,
  O: -10,
  X: 10,
};

function getEmptyCell(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      return i;
    }
  }
  return null; //no empty squares left on board
}

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

  bestAIMove(squares) {
    let bestScore = -1000;
    //let score;
    let move;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        let score = this.minimax(squares, true);
        console.log('score in bestAImove: ' + score);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    console.log(move);
    return move;
  }

  minimax(board, isMaximizing) {
    let result = calculateWinner(board);
    let checkIfTie = board.filter((word) => word === null).length;
    if (result || checkIfTie === 1) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let score = this.minimax(board, false);
          board[i] = null;
          // if (score > bestScore) {
          //   bestScore = score;
          // }
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = 1000;
      for (let i = 0; i++; i < 9) {
        if (board[i] === null) {
          board[i] = 'X';
          let score = this.minimax(board, true);
          board[i] = null;
          // if (score < bestScore) {
          //   bestScore = score;
          // }
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
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
      // this.setState({
      //   squares: squares,
      // });
      this.state.xIsNext = !this.state.xIsNext;
      //let move = this.AIplayerRandom(squares);
      //squares[move] = !this.state.xIsNext ? 'X' : 'O';
      //let score = this.minimax(squares, 0, false, 0, 0);
      //console.log(score);
      let move = this.bestAIMove(squares);
      squares[move] = !this.state.xIsNext ? 'O' : 'X';
      this.state.xIsNext = !this.state.xIsNext;
      this.setState({
        squares: squares,
      });
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
