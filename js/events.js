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

function checkVictory() {
  var opened = document.querySelectorAll(".cell-opened").length;
  var total = ROWS * COLS - mines.length;

  if (opened === total) {
    stopTimer();
    disabledBoard();
    showModal("You won! 🎉");

    document.getElementById("win-sound").play();

    var formattedTime =
      String(Math.floor(seconds / 60)).padStart(2, "0") +
      ":" +
      String(seconds % 60).padStart(2, "0");
    console.log(playerName,formattedTime)
    saveResult(playerName, formattedTime);
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

document.getElementById("contact-button").addEventListener("click", () => {
  window.location.href = "contact.html";
});

document
  .getElementById("ranking-button")
  .addEventListener("click", showRanking);
document.getElementById("ranking-close").addEventListener("click", function () {
  document.getElementById("ranking-modal").classList.add("hidden");
});
