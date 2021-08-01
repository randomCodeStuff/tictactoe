import calculateWinner from './calculateWinner';

let scores = {
  T: 0,
  O: 10,
  X: -10,
  null: null,
};

export default function minimaxAlphaBeta(
  board,
  isMaximizing,
  depth,
  alpha,
  beta
) {
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
