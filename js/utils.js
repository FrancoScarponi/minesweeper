"use strict";

function isValidName(name) {
  return name.length >= 3;
}


function countAdjacentMines(row, col, mines) {
  var count = 0;

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      var newRow = row + i;
      var newCol = col + j;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        var neighborKey = newRow + "," + newCol;
        if (mines.includes(neighborKey)) {
          count++;
        }
      }
    }
  }

  return count;
}
