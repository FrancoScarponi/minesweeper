"use strict";

function addCellEvents(mines) {
  var cells = document.getElementsByClassName("cell");

  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      handleLeftClick(this, mines);
    });
  }
}

function handleLeftClick(cell, mines) {
  var row = parseInt(cell.dataset.row);
  var col = parseInt(cell.dataset.col);
  var key = row + "," + col;

  if (cell.classList.contains("cell-opened")) return;

  cell.classList.remove("cell-closed");
  cell.classList.add("cell-opened");

  if (mines.includes(key)) {
    cell.textContent = "💣";
    cell.style.backgroundColor = "red";
    disabledBoard();
    alert("You hit a mine. Game over D:");
  } else {
    var count = countAdjacentMines(row, col, mines);
    if (count === 0) {
      cell.textContent = "";
      chording(key, mines);
    } else {
      cell.textContent = count;
    }
    cell.style.pointerEvents = "none";
    checkVictory(mines);
  }
}

function chording(key, mines) {
  var row = parseInt(key.split(",")[0]);
  var col = parseInt(key.split(",")[1]);

  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;

      var newRow = row + dx;
      var newCol = col + dy;
      var newKey = newRow + "," + newCol;

      if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS)
        continue;

      var neighbor = document.querySelector(
        '[data-row="' + newRow + '"][data-col="' + newCol + '"]'
      );

      if (!neighbor || neighbor.classList.contains("cell-opened")) continue;
      if (mines.includes(newKey)) continue;

      neighbor.classList.remove("cell-closed");
      neighbor.classList.add("cell-opened");
      neighbor.style.pointerEvents = "none";

      var count = countAdjacentMines(newRow, newCol, mines);

      if (count === 0) {
        neighbor.textContent = "";
        chording(newKey, mines);
      } else {
        neighbor.textContent = count;
      }
    }
  }
}

function checkVictory(mines) {
  var opened = document.querySelectorAll(".cell-opened").length;
  var total = ROWS * COLS - mines.length;
  if (opened === total) {
    disabledBoard();
    alert("You won! 🎉");
  }
}

function disabledBoard() {
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.pointerEvents = "none";
  }
}
