"use strict";

var form = document.getElementById("player-form");
var inputName = document.getElementById("player-name");
var gameInfo = document.getElementById("game-info");
var boardElement = document.getElementById("board");
var restart = document.getElementById("restart-button");
var difficultySelect = document.getElementById("difficulty");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = inputName.value.trim();

  if (isValidName(name)) {
    playerName = name;
    startGame();
  } else {
    alert("Name must be at least 3 characters long.");
  }
});

difficultySelect.addEventListener("change", function () {
  startGame();
});

restart.addEventListener("click", function () {
  startGame();
});

function startGame() {
  var settings = getDifficultySettings();
  ROWS = settings.rows;
  COLS = settings.cols;
  minesLeft = settings.mines;
  totalMines = settings.mines;
  form.classList.add("hidden");
  gameInfo.classList.remove("hidden");
  boardElement.classList.remove("hidden");

  mines = generateMines(ROWS, COLS, settings.mines);
  generateBoard(ROWS, COLS, mines);
  addCellEvents(mines);
}
