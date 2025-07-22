"use strict";

var form = document.getElementById("player-form");
var inputName = document.getElementById("player-name");
var gameInfo = document.getElementById("game-info");
var board = document.getElementById("board");
var restart = document.getElementById("restart-button")

var ROWS = 8;
var COLS = 8;
var CELL_SIZE = 40;
var mines = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = inputName.value.trim();

  if (isValidName(name)) {
    startGame(name);
  } else {
    alert("Name must be at least 3 characters long.");
  }
});

restart.addEventListener("click", function (){
  restartGame()
})

function startGame(name) {
  form.classList.add("hidden");
  gameInfo.classList.remove("hidden");
  board.classList.remove("hidden");

  mines = generateMines(ROWS, COLS, 10);
  generateBoard(ROWS, COLS, mines);
  addCellEvents(mines);
}

function restartGame() {
  startGame()
}

