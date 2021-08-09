import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import store, { initialState } from './app/store';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

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
