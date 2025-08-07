"use strict";

function addCellEvents(mines, rows, cols) {
  var cells = document.getElementsByClassName("cell");

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];

    cell.addEventListener("click", function () {
      var isOpened = this.classList.contains("cell-opened");
      var isNumber = !isNaN(parseInt(this.textContent));

      if (isOpened && isNumber) {
        var row = parseInt(this.dataset.row);
        var col = parseInt(this.dataset.col);
        chording(row, col, ROWS, COLS);
        return;
      }

      handleLeftClick(this);
    });

    cell.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      handleRightClick(this);
    });
  }
}

function handleLeftClick(cell) {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  if (cell.textContent === "🚩") return;
  var row = parseInt(cell.dataset.row);
  var col = parseInt(cell.dataset.col);
  var key = row + "," + col;

  if (cell.classList.contains("cell-opened") && cell.textContent !== "") {
    chording(row, col, ROWS, COLS);
    return;
  }

  openCell(cell, row, col);
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

document.getElementById("contact-button").addEventListener("click", () => {
  window.location.href = "contact.html";
});

document
  .getElementById("ranking-button")
  .addEventListener("click", showRanking);
document.getElementById("ranking-close").addEventListener("click", function () {
  document.getElementById("ranking-modal").classList.add("hidden");
});

document.getElementById("sort-duration").addEventListener("click", function () {
  currentSort = "duration";
  showRanking();
});

document.getElementById("sort-date").addEventListener("click", function () {
  currentSort = "date";
  showRanking();
});

