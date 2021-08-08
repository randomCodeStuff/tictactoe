import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const xIsNext = createAction('xIsNext');
const squares = createAction('squares');
const history = createAction('history');
const stepNumber = createAction('stepNumber');

// export const aiMove = aiMoveThunk(async (board) => {
//   const move = await bestAIMove(board);
//   return move.data;
// });

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

export { initialState };
//thunk
const aiMove = createAsyncThunk(initialState, {
  //stuff
});
//reducer
const reducer = createReducer(initialState, {
  [history]: (state, action) => {
    console.log(action);
    return state;
  },
  [xIsNext]: (state, action) => {
    console.log(action);
    return state;
  },
  [squares]: (state, action) => {
    console.log(action);
    return state;
  },
  [stepNumber]: (state, action) => {
    console.log(action);
    return state;
  },
});

export default configureStore({ reducer });
