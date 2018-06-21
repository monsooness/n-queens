// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // I: number
    // O: bool
    hasRowConflictAt: function(rowIndex) {
      // create a counter var
      var count = 0;
      // loop through the row
      for (let number of this.rows()[rowIndex]) {
        // check if element is 1
        if (number === 1) {
          // increment counter
          count++;
        }
      }
      // check if counter is greater or equal to two
      return count >= 2;
    },

    // test if any rows on this board contain conflicts
    // I: none
    // O: bool
    hasAnyRowConflicts: function() {
      // iterate over the matrix
      for (let i = 0; i < this.rows().length; i++) {
        // invoke hasRowConflictAt and pass in indices
        if(this.hasRowConflictAt(i)) {
          return true;        
        }
      }
      return false;
      // return false
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // I: number
    // O: bool
    hasColConflictAt: function(colIndex) {
      // keep track of a count
      var count = 0;
      var matrix = this.rows();
      // loop over each row
      for (let i = 0; i < matrix.length; i++) {
        // check if element at the given columnIndex is === 1
        if (matrix[i][colIndex] === 1) {
          // increment counter
          count++;
        }
      }

      // return true if counter >= 2
      return count >= 2;
    },

    // test if any columns on this board contain conflicts
    // I: none
    // O: bool
    hasAnyColConflicts: function() {
      // loop through the columns in the matrx
      for (let col = 0; col < this.rows().length; col++) {
        // invoke hasColConflictAt for each column
        if(this.hasColConflictAt(col)) {
          // return true
          return true;
        }
      }
      
      // return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // counter variable
      var count = 0;
      var matrix = this.rows();
      // column is the input
      var column = majorDiagonalColumnIndexAtFirstRow;
      // loop through every row 
      for (var i = 0; i<matrix.length; i++) {
        //check if coordinates are equal to one
        if (matrix[i][column] === 1) {
          //increment count
          count++;
        }
        //increment row and column
        column++;
      }
      //return true if count > 1
      return count>1;
      
    },

    // test if any major diagonals on this board contain conflicts
    //I = none
    //O = Bool
    hasAnyMajorDiagonalConflicts: function() {
      var matrix = this.rows();
      //iterate over every diagonal starting at -n+1
      for (var i = (-matrix.length+1); i < matrix.length; i++) {
      // invoke hmdca with the index passed in as arg
        if (this.hasMajorDiagonalConflictAt(i)) {
        // return true
          return true;
        }
      }
      //return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // I: number
    // O: bool
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create matrix variable
      // debugger;
      var matrix = this.rows();
      console.log(matrix);
      // create a count
      var count = 0;
      // create column variable
      var column = minorDiagonalColumnIndexAtFirstRow;
      // loop through every row
      for (let i = 0; i < matrix.length; i++) {
        // check if the element === 1
        if (matrix[i][column] === 1) {
          // increment count
          count++;
        }
        // decrement column
        column--;
      }
      // return true if count > 1
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create matrix
      var matrix = this.rows();
      // iterate over every diagonal starting at 1; stop at n + 2
      for (let i = 1; i < Math.ceil(matrix.length * 1.5); i++) {
        // if hmdca returns true
        if (this.hasMinorDiagonalConflictAt(i)) {
          // return true
          return true;
        }
      }
      // return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
