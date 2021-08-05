import { configureStore } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReactReduxContext } from 'react-redux';
//import {createStore} from 'redux';

//type constraints
const MAKEAIMOVE = 'MAKEAIMOVE';
const ISXNEXT = 'ISXNEXT';
const HISTORY = 'HISTORY';

//Actinon creater
export const aimove = () => {
  return {
    type: MAKEAIMOVE,
  };
};

export const player = () => {
  return {
    type: ISXNEXT,
  };
};

export const viewhistory = () => {
  return {
    type: HISTORY,
  };
};

//thunk to make move?
export const aiMove(board) = aiMoveThunk(
  async(board) =>{
      const move=await bestAIMove(board);
      return move.data;
  }
);

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};
//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ISXNEXT:
      return {
        isXnext: {...state, xisNext: !xisNext} //might break this up
      };
    case HISTORY:
      return {
        history: {...state, history: 'not sure yet'}
      };
    case MAKEAIMOVE:
      return {
        board: {...state, board: 'not sure yet'}
      };
    default:
      return state;
  }
};

export default configureStore(reducer);

//const store=createStore(rootReducer);