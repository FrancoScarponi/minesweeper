"use strict";

var form = document.getElementById("player-form");
var playerSection = document.getElementById("player-section");
var inputName = document.getElementById("player-name");
var gameInfo = document.getElementById("game-panel");
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
    showModal("Name must be at least 3 characters long.");
  }
});

difficultySelect.addEventListener("change", function () {
  startGame();
});

restart.addEventListener("click", function () {
  stopTimer()
  timerStarted = false
  document.getElementById("timer").textContent = "0";
  startGame();
});

function startGame() {
  var settings = getDifficultySettings();
  ROWS = settings.rows;
  COLS = settings.cols;
  minesLeft = settings.mines;
  totalMines = settings.mines;
  playerSection.classList.add("hidden");
  gameInfo.classList.remove("hidden");
  boardElement.classList.remove("hidden");
  difficultySelect.classList.remove("hidden");
  mines = generateMines(ROWS, COLS, settings.mines);
  generateBoard(ROWS, COLS, mines);
  addCellEvents(mines);
}


function toggleTheme () {
  var themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  var savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme + "-theme");
  themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    var newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
  });
};

toggleTheme()
