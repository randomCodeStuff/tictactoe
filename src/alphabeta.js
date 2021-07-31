//minimax with alpha beta prunning
//alpha beta prunning is improving the minimax algroithm by prunning paths
//...it will never go down to save computations
//The main condtion required for pruning is:
// a>=b
//Max player only update alpha values
//Min player only update beta values
//apha and beta are passed down to children
// values are passed up into parent alpha or beta nodes
//...depending on max min status
// this algorithm is in post tree order depth first search
//Really nice practice app link:
//https://minmax-alpha-beta.herokuapp.com/
//one of the better tutorials that really helped me understand what was
//actually happening with alpha and beta instead of just the gist
//https://www.javatpoint.com/ai-alpha-beta-pruning
//remember depth starts at the root node at 0 and
//hieght starts at the leaf nodes and starts at 0
let calculateWinner;
let scores;

function minimaxAlphaBeta(board, isMaximizing, depth, alpha, beta) {
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
