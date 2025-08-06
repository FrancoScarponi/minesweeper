"use strict";

function generateBoard(rows, cols, mines) {
  currentRows = rows;
  currentCols = cols;

  var board = document.getElementById("board");
  board.innerHTML = "";

  adjustCellSize(rows, cols);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("div");
      cell.classList.add("cell", "cell-closed");
      cell.dataset.row = i;
      cell.dataset.col = j;

      let key = i + "," + j;
      
/*       if (mines.includes(key)) {
        cell.innerHTML = '🖤'; 
        cell.style.color = "black"
      } */

      board.appendChild(cell);
    }
  }
}

function adjustCellSize(rows, cols) {
  const screenWidth = window.innerWidth;
  const margin = 40; 
  const availableSpace = screenWidth - (margin * 2); 
  const cellSize = Math.floor(availableSpace / cols);
  const finalSize = Math.max(16, Math.min(cellSize, 40));

  document.documentElement.style.setProperty('--cell-size', `${finalSize}px`);

  const boardSize = finalSize * cols;
  const board = document.getElementById("board");
  board.style.width = boardSize + "px";
  board.style.height = boardSize + "px"; 
}

window.addEventListener("resize", () => {
  adjustCellSize(currentRows, currentCols);
});

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
