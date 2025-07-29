"use strict";

function generateBoard(rows, cols, mines) {
  var board = document.getElementById("board");
  board.innerHTML = "";
  board.style.width = cols * CELL_SIZE + "px";

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("div");
      cell.classList.add("cell", "cell-closed");
      cell.dataset.row = i;
      cell.dataset.col = j;

      let key = i + "," + j;
      if (mines.includes(key)) {
        cell.innerHTML = '🖤'; 
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

function getDifficultySettings() {
  var difficulty = document.getElementById("difficulty").value;
  var minesLeftInfo = document.getElementById("mines-left");

  if (difficulty === "easy") {
    minesLeftInfo.innerText = 10;
    return { rows: 8, cols: 8, mines: 10 };
  } else if (difficulty === "medium") {
    minesLeftInfo.innerText = 25;
    return { rows: 12, cols: 12, mines: 25 };
  } else if (difficulty === "hard") {
    minesLeftInfo.innerText = 40;
    return { rows: 16, cols: 16, mines: 40 };
  }
}
