// /*           _
//    ___  ___ | |_   _____ _ __ ___
//   / __|/ _ \| \ \ / / _ \ '__/ __|
//   \__ \ (_) | |\ V /  __/ |  \__ \
//   |___/\___/|_| \_/ \___|_|  |___/

// */

// // hint: you'll need to do a full-search of all possible arrangements of pieces!
// // (There are also optimizations that will allow you to skip a lot of the dead search space)
// // take a look at solversSpec.js to see what the tests are expecting





// // return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.findNRooksSolution = function(n) {
//   // debugger;
//   var solution = new Board({'n': n});
//   // console.log('solution', solution);
//   // create inner function, that takes in a row number, actual row
//   var setPiece = function(rowNum, row) {
//     // iterate over the row
//     for (let i = 0; i < row.length; i++) {
//       // at each index, toggle
//       this.togglePiece(rowNum, i);
//       // check to see theres conflicts
//       // if no conflict, return
//       // debugger;
//       if (!this.hasAnyRooksConflicts()) {
//         return;
//         // if there is a conflict
//       } else {
//         // remove toggle
//         this.togglePiece(rowNum, i);
//       }
//     }
//     // loop over rows
//     // at each row, call the inner function
//   };
//   for (let i = 0; i < solution.rows().length; i++) {
//     setPiece.call(solution, i, solution.rows()[i]);
//   }

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution.rows();
// };


// /*var matrix = [
//   [1, 0, 0, 0], => 0
//   [0, 0, 1, 0], => 1
//   [0, 0, 0, 0], => 2
//   [0, 0, 0, 0]  => 3
// ];
// */

// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solution = new Board({n: n});
//   var solutionCount = 0; //fixme

//   var setPiece = function(rowNum, row) {
//     // iterate over the row
//     for (let i = 0; i < row.length; i++) {
//       // at each index, toggle
//       this.togglePiece(rowNum, i);
//       // check to see theres conflicts
//       // if no conflict, return
//       // debugger;
//       if (!this.hasAnyRooksConflicts()) {
//         if (rowNum === this.rows().length - 1) {
//           solutionCount++;
//           this.togglePiece(rowNum, i);
//         } else {
//           setPiece.call(solution, rowNum + 1, solution.rows()[rowNum + 1]);
//           this.togglePiece(rowNum, i);
//         }
//         // if there is a conflict
//       } else {
//         // remove toggle
//         this.togglePiece(rowNum, i);
//       }

//     }
//     // loop over rows
//     // at each row, call the inner function
//   };
//   setPiece.call(solution, 0, solution.rows()[0]);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

//   return solutionCount;
// };

// // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   var solution = new Board({n: n});
//   var finished = false;
//   var pieceCount = 0;
//   var setPiece = function(rowNum, row) {
//     for (let i = 0; i < row.length; i++) {
//       if (finished) {
//         return;
//       }
//       this.togglePiece(rowNum, i);
//       if (!this.hasAnyQueensConflicts()) {
//         pieceCount++;
//         if (rowNum === this.rows().length - 1) {
//           if (pieceCount === n) {
//             finished = true;
//           } else {
//             pieceCount = 0;
//           }
//           // this.togglePiece(rowNum, i);
//         } else {
//           setPiece.call(solution, rowNum + 1, solution.rows()[rowNum + 1]);
//           // this.togglePiece(rowNum, i);
//         }
//         // if there is a conflict
//       } else {
//         // remove toggle
//         this.togglePiece(rowNum, i);
//       }

//     }
//     // loop over rows
//     // at each row, call the inner function
//   };
//   // debugger;
//   if (n === 0) {
//     return solution.rows();
//   } else {
//     setPiece.call(solution, 0, solution.rows()[0]);
//   }



//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   console.log('solutionRows', solution.rows());
//   return solution.rows();

// /*
// // if (n === 0) {
//   //   return [[]];

// // }
// // var solution = new Board({n: n}); //fixme
// // console.log('solution rows', solution.rows().length);
// // // create inner function, that takes in a row number, actual row
// // var setPiece = function(rowNum, row) {
//   // iterate over the row
//   // for (let i = 0; i < n; i++) {
//   //   // at each index, toggle
//   //   this.togglePiece(rowNum, i);
//   //   // check to see theres conflicts
//   //   // if no conflict, return
//   //   // debugger;

//   //   if (!this.hasAnyQueensConflicts()) {

//   //     return;
//   //     // if there is a conflict
//   //   } else {
//   //     // remove toggle
//   //     this.togglePiece(rowNum, i);
//   //   }
//   // }
// // };
// // debugger;
// // for (let i = 0; i < n; i++) {
// //   debugger;
// //   setPiece.call(solution, i, solution.rows()[i]);
// // };
// */

// };

// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solutionCount = new Board({'n': n}); //fixme

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };


// -----------------------

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


window.findSolution = function(row, n, board, validator, callback) {
  // if all rows exhausted, this is a valid solution.
  if (row === n) {
    return callback();
  }

  // iterate over possible decisions
  for (var i = 0; i < n; i++) {
    // place a piece
    board.togglePiece(row, i);
    // recurse into remaining problem
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result; // EJECT
      }
    }
    // unplace a piece
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var board = new Board({n: n});

  var solutionCount = 0;

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });
  // If no solution exists, return the original unaltered board
  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var board = new Board({n: n});

  var solutionCount = 0;

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};