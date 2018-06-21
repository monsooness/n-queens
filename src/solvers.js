/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  // create a new board using n
  var board = new Board({'n': n});
  // for loop to iterate n times
  for (let i = 0; i < n; i++) {
    // call togglePiece pass in args (i, i)
    board.togglePiece(i, i);
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

  // create a board
  // var board = new Board({'n': n});
  // var matrix = board.rows();
  //   // iterate over every row
  //   for (let row = 0; row < matrix.length; row++) {
  //     // iterate over every column
  //     for (let col = 0; col < matrix[0].length; col++) {
  //       // add a rook
  //       board.togglePiece(row, col);
  //       // check if thats ok
  //       if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
  //         // remove the rook
  //         board.togglePiece(row, col);
  //       }
  //     }
  //   }
  // // return result
  // return board.rows(); 
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
//I = a number, and a board
//O = a number
window.countNRooksSolutions = function(n, board) {
  //base case
  // if board equals undefined 
    //create new board
  // if the board has a solution and n rooks
    //return 1
  // if the board has n rooks and no solution
    //return 0
  //

  //create a count = 0
  //loop over every row
  //create a nested loop to loop over column
    //add a rook if it permits
       //make sure no rooks at the position
       //make sure no rooks in the same row and column
    // call the function and pass in the same n and the new board
    //add the return to count

    //return count
    


 var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
