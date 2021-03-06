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
    /*var matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    */
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // debugger;
      var rows = this.rows(); //for board.rows
      var row = rows[rowIndex];
      var pieceCount = 0;
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          pieceCount += 1;
        }
        if (pieceCount >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // iterate through the this.rows
      // debugger;
      let board = this.rows();
      // in each iteration, we pass i to hasrowconflictsat
      for (let i = 0; i < board.length; i++) {
        // if the result of above is true, return true;
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      // return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var counter = 0;
      for (let i = 0; i < board.length; i++) {
        if (board[i][colIndex]) {
          counter++;
        }
        if (counter === 2) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var rowLength = board.length;
      for (var i = 0; i < rowLength; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      // for (var i = 0; i < board.length; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var currentIndex = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      // iterate over the board
      for (var i = 0; i < board.length; i++) {
        if (board[i][currentIndex]) {
          counter++;
        }
        if (counter === 2) {
          return true;
        }
        currentIndex++;
      }
      return false; // fixme
      // at each row, we check to see if the row at currentIndex is truthy
      //   if it is, add to counter
      // else, break;

      // if the counter ever becomes 2 or more, return true
      //  add to currentindex
    },


   //use splice to ensure that the row we are checking is the new row 0

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var conflict = false;
      // has conflict variable as false
      var hasConflict = function(matrix) {
        if (matrix[0] === undefined) {
          return false;
        }
        for (let i = 0; i < matrix.length; i++) {
          // console.log('this ', this);
          // console.log('test ', this.hasMajorDiagonalConflictAt(i));
          // debugger;
          if (this.hasMajorDiagonalConflictAt(i) === true) {
            conflict = true;
            return;
          }
        }
        if (matrix.length === 2) {
          return;
        } else {
          var copy = matrix.slice(1);
          var newBoard = new Board(copy);
          hasConflict.call(newBoard, newBoard.rows());
        }
      };


      hasConflict.call(this, board);
      return conflict;
      // create inner function, that takes in matrix
        //  iterate, from i to argument.length
          // check major conflicts for each column
          // if its false,
            // if length is two, then return.
           //  else, we create splice, and run it through recursive function
          // if its true, change conflict variable, return;

      // conflict variable
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var currentIndex = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      // iterate over the board
      for (var i = 0; i < board.length; i++) {
        if (board[i][currentIndex] === 1) {
          counter++;
        }
        if (counter === 2) {
          return true;
        }
        currentIndex--;
      }
      return false; // fixme
    },


    /*var matrix = [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0]
    ];
    */

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var conflict = false;
      // has conflict variable as false
      var hasConflict = function(matrix) {
        if (matrix[0] === undefined) {
          return false;
        }
        for (let i = matrix[0].length - 1; i > 0; i--) {
          if (this.hasMinorDiagonalConflictAt(i) === true) {
            conflict = true;
            return;
          }
        }
        if (matrix.length === 2) {
          return;
        } else {
          var copy = matrix.slice(1);
          var newBoard = new Board(copy);
          hasConflict.call(newBoard, newBoard.rows());
        }
      };


      hasConflict.call(this, board);
      return conflict;
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
