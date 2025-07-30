"use strict";

function addCellEvents(mines, rows, cols) {
  var cells = document.getElementsByClassName("cell");

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];

    cell.addEventListener("click", function () {
      const isOpened = this.classList.contains("cell-opened");
      const isNumber = !isNaN(parseInt(this.textContent));

      if (isOpened && isNumber) {
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        chording(row, col, mines, ROWS, COLS);
        return;
      }

      handleLeftClick(this, mines, rows, cols);
    });

    cell.addEventListener("contextmenu", function (e) {
      e.preventDefault(); 
      handleRightClick(this);
    });
  }
}

function handleLeftClick(cell, mines) {
  if (cell.textContent === "🚩") return;
  
  var row = parseInt(cell.dataset.row);
  var col = parseInt(cell.dataset.col);
  var key = row + "," + col;

  if (cell.classList.contains("cell-opened") && cell.textContent !== "") {
    chording(row, col, mines, ROWS, COLS);
    return;
  }

  openCell(cell, row, col, mines);
}

function expandEmptyCells(key, mines) {
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
      
      var count = countAdjacentMines(newRow, newCol, mines);

      if (count === 0) {
        neighbor.textContent = "";
        expandEmptyCells(newKey, mines);
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
    showModal("You won! 🎉")
  }
}

function disabledBoard() {
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.pointerEvents = "none";
  }
}

function handleRightClick(cell) {
  if (cell.classList.contains("cell-opened")) return;

  if (cell.textContent === "🚩") {
    cell.textContent = "";
    cell.classList.remove("cell-flagged");
  } else {
    cell.textContent = "🚩";
    cell.classList.add("cell-flagged");
  }

  updateMinesLeft();
}
