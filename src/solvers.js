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
window.countNRooksSolutions = function(n, board, startRow, startCol) {
  //base case
  var count = 0;
  // if board equals undefined 
  if (board === undefined) {
    //create new board
    var board = new Board({'n':n});
    // count += countNRooksSolutions()
  }
  if (startRow === undefined) {
    startRow = 0;
    startCol = 0;
  }
  var matrix = board.rows()
  //loop through the entire matrix and count number of 1s
  var ones = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++ ) {
      if (matrix[i][j] === 1) {
        ones++;
      }
    }
  }
  if (ones === n) {
    // console.log(matrix);
  // if the board has a solution and n rooks
    //if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
      //return 1
      return 1;
    //} else {
    // if the board has n rooks and no solution
      //return 0
      //return 0
    }

  //create a count = 0

  //loop over every row
  var skip = startRow * n + startCol;
  for (let i = 0; i < matrix.length; i++) {
    //create a nested loop to loop over column
    for (let j = 0; j < matrix[i].length; j++) {
      // skip over old positions
      // row * n + col + 1
      if (skip > 0) {
        skip--;
        continue;
      }
      //add a rook if it permits
       //make sure no rooks at the position
      if (matrix[i][j] !== 1) {
        board.togglePiece(i,j);
       //make sure no rooks in the same row and column
        if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
          // call the function and pass in the same n and the new board
          //add the return to count
          var mat = board.rows();
          for (let row of mat) {
            console.log(row.toString());
          }
          console.log('-----------')
          count += countNRooksSolutions(n, board, i, j);
        }
        board.togglePiece(i,j);
      }
    }  
  }
  //return count
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
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
