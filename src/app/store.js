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
  status: '',
};

export { initialState };

export const handleClickAsync = createAsyncThunk(
  'counter/fetchCount',
  async (i) => {
    const response = await i;
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(handleClickAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleClickAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export default configureStore({ reducer });
