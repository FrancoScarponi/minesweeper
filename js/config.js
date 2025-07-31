"use strict";

var ROWS = 8;
var COLS = 8;
var CELL_SIZE = 40;
var mines = [];
var playerName = "";
var minesLeft = 0;
var totalMines = 0
var timerInterval = null;
var timerStarted = false;

let currentRows = 0;
let currentCols = 0;
