"use strict";

function isValidName(name) {
  return name.length >= 3;
}

function countAdjacentMines(row, col) {
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

function chording(row, col, rows, cols) {
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
      openCell(n, r, c); 
    }
  }
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

      var count = countAdjacentMines(newRow, newCol);

      if (count === 0) {
        neighbor.textContent = "";
        expandEmptyCells(newKey, mines);
      } else {
        neighbor.textContent = count;
      }
    }
  }
}

function openCell(cell, row, col) {

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
    var count = countAdjacentMines(row, col);
    if (count === 0) {
      cell.textContent = "";
      expandEmptyCells(key, mines);
    } else {
      cell.textContent = count;
    }
    checkVictory();
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
  var timerDisplay = document.getElementById("timer");
  seconds = 0
  timerInterval = setInterval(function () {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

function saveResult(name, duration) {
  var games = JSON.parse(localStorage.getItem("minesweeper_ranking")) || [];

  var now = new Date();
  var datetime = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0");

  games.push({
    name: name,
    duration: duration,
    datetime: datetime
  });
  
  games.sort(function (a, b) {
    return parseTime(a.duration) - parseTime(b.duration);
  });

  localStorage.setItem("minesweeper_ranking", JSON.stringify(games));
}

function parseTime(t) {
  var parts = t.split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function showRanking() {
  var games = JSON.parse(localStorage.getItem("minesweeper_ranking")) || [];
  var tbody = document.querySelector("#ranking-table tbody");
  tbody.innerHTML = "";

  for (var i = 0; i < games.length; i++) {
    var g = games[i];
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + g.name + "</td>" +
      "<td>" + g.duration + "</td>" +
      "<td>" + g.datetime + "</td>";
    tbody.appendChild(row);
  }

  document.getElementById("ranking-modal").classList.remove("hidden");
}

