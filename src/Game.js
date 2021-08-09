import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import calculateWinner from './calculateWinner';
import bestAIMove from './bestAIMove';
import Board from './Board';
import store, { initialState } from './app/store';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  async handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
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
      stepNumber: history.length,
      xIsNext: false,
    });
    let move = bestAIMove(squares); //in order checked;
    squares[move] = this.state.xIsNext ? 'X' : 'O';
    await this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: true,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      //xIsNext: step % 2 === 0,
      xIsNext: true,
    });
  }

  render() {
    console.dir('store' + JSON.stringify(initialState));
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, themove) => {
      const desc = themove ? 'Go to move #' + themove : 'Go to game start';
      return (
        <li key={themove}>
          <button onClick={() => this.jumpTo(themove)}>{desc}</button>
        </li>
      );
    });
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
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
