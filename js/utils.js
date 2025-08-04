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

      if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
        var neighborKey = newRow + "," + newCol;
        if (mines.includes(neighborKey)) {
          count++;
        }
      }
    }
  }
  return count;
}

function updateMinesLeft() {
  var allCells = document.getElementsByClassName("cell");
  var flags = 0;

  for (var i = 0; i < allCells.length; i++) {
    if (allCells[i].textContent === "🚩") {
      flags++;
    }
  }
  var minesLeft = totalMines - flags;
  document.getElementById("mines-left").textContent = minesLeft;
}

function getNeighbors(row, col) {
  const neighbors = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const r = row + dx;
      const c = col + dy;
      const selector = `[data-row="${r}"][data-col="${c}"]`;
      const neighbor = document.querySelector(selector);
      if (neighbor) neighbors.push(neighbor);
    }
  }
  return neighbors;
}

function chording(row, col, mines, rows, cols) {
  "use strict";

  var cell = document.querySelector(
    '[data-row="' + row + '"][data-col="' + col + '"]'
  );
  var number = parseInt(cell.textContent);

  var flaggedCount = 0;
  var neighbors = [];

  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;

      var newRow = row + dx;
      var newCol = col + dy;

      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)
        continue;

      var neighbor = document.querySelector(
        '[data-row="' + newRow + '"][data-col="' + newCol + '"]'
      );
      if (!neighbor) continue;

      if (neighbor.classList.contains("cell-flagged")) {
        flaggedCount++;
      } else if (!neighbor.classList.contains("cell-opened")) {
        neighbors.push(neighbor);
      }
    }
  }
  if (flaggedCount === number) {
    for (var i = 0; i < neighbors.length; i++) {
      var n = neighbors[i];
      var r = parseInt(n.dataset.row);
      var c = parseInt(n.dataset.col);
      openCell(n, r, c, mines); 
    }
  }
}

function openCell(cell, row, col, mines) {
  "use strict";

  var key = row + "," + col;

  if (
    cell.classList.contains("cell-opened") ||
    cell.classList.contains("cell-flagged")
  ) return;

  cell.classList.remove("cell-closed");
  cell.classList.add("cell-opened");

  if (mines.includes(key)) {
    stopTimer();
    cell.textContent = "💣";
    cell.style.backgroundColor = "red";
    disabledBoard();
    document.getElementById("lose-sound").play();
    showModal("You hit a mine. Game over D:")
  } else {
    var count = countAdjacentMines(row, col, mines);
    if (count === 0) {
      cell.textContent = "";
      expandEmptyCells(key, mines);
    } else {
      cell.textContent = count;
    }
    checkVictory(mines);
  }
}

function showModal(message) {
  var modal = document.getElementById("modal");
  var modalMessage = document.getElementById("modal-message");
  var modalClose = document.getElementById("modal-close");

  modalMessage.textContent = message;
  modal.classList.remove("hidden");

  modalClose.onclick = function () {
    modal.classList.add("hidden");
  };
}

function startTimer() {
  var seconds = 0;
  var timerDisplay = document.getElementById("timer");

  timerInterval = setInterval(function () {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

