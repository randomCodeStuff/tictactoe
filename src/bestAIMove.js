import minimaxAlphaBeta from './minimaxAlphaBeta';

let intermediateScores = {
  0: 10,
  1: -10,
  2: 10,
  3: -10,
  4: 10,
  5: -10,
  6: 10,
  7: -10,
  8: 10,
};
export default function bestAIMove(squares) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      let score = minimaxAlphaBeta(squares, false, 8, -Infinity, Infinity);
      if (score === null) {
        score = intermediateScores[i]; //
      }
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}
