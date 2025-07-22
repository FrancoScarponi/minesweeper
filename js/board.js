"use strict";

function generateBoard(rows, cols, mines) {
  var board = document.getElementById("board");
  board.innerHTML = "";

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("cell-closed");
      cell.dataset.row = i;
      cell.dataset.col = j;

      var key = i + "," + j;
      if (mines.includes(key)) {
        cell.innerHTML = '🖤'
      }
      board.appendChild(cell);
    }
  }
}

function generateMines(rows, cols, count) {
  var result = [];
  while (result.length < count) {
    var r = Math.floor(Math.random() * rows);
    var c = Math.floor(Math.random() * cols);
    var key = r + "," + c;
    if (!result.includes(key)) {
      result.push(key);
    }
  }
  return result;
}

function restartGamer(){
  
}

