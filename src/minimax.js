// Javascript program to demonstrate
// working of Alpha-Beta Pruning

// Initial values of
// Aplha and Beta
let MAX = 1000;
let MIN = -1000;

// Returns optimal value for
// current player (Initially called
// for root and maximizer)
function minimax(depth, nodeIndex, maximizingPlayer, values, alpha, beta) {
  // Terminating condition. i.e
  // leaf node is reached
  if (depth == 3) return values[nodeIndex];

  if (maximizingPlayer) {
    let best = MIN;

    // Recur for left and
    // right children
    for (let i = 0; i < 2; i++) {
      let val = minimax(
        depth + 1,
        nodeIndex * 2 + i,
        false,
        values,
        alpha,
        beta
      );
      best = Math.max(best, val);
      alpha = Math.max(alpha, best);

      // Alpha Beta Pruning
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = MAX;

    // Recur for left and
    // right children
    for (let i = 0; i < 2; i++) {
      let val = minimax(
        depth + 1,
        nodeIndex * 2 + i,
        true,
        values,
        alpha,
        beta
      );
      best = Math.min(best, val);
      beta = Math.min(beta, best);

      // Alpha Beta Pruning
      if (beta <= alpha) break;
    }
    return best;
  }
}

// Driver Code
//let values = [3, 5, 6, 9, 1, 2, 0, -1];
let values = [3, 12, 8, 2, 4, 6, 14, 5, 2];

console.log('The optimal value is : ' + minimax(0, 0, true, values, MIN, MAX));
