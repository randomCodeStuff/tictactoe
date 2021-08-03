import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

export const aiMove(board) = aiMoveThunk(
    async(board) =>{
        const move=await bestAIMove(board);
        return move.data;
    }
);
