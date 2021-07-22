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
