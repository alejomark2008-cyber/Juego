const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const messageText = document.getElementById("message-text");

const levelNumber = document.getElementById("level-number");
const deathCount = document.getElementById("death-count");
const progressFill = document.getElementById("progress-fill");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");

/* =========================
   ESTADO DEL JUEGO
========================= */

let gameRunning = false;
let screenState = "start";

let currentLevel = 1;
let deaths = 0;

let leftPressed = false;
let rightPressed = false;

let cameraX = 0;
let animationId = null;

let worldWidth = 2200;

const player = {
  x: 60,
  y: 0,
  width: 28,
  height: 40,
  speed: 4.5,
  velocityY: 0,
  gravity: 0.65,
  jumpPower: -12.5,
  onGround: false
};

const level = {
  groundY: 0,
  platforms: [],
  spikes: [],
  door: null
};

/* =========================
   TAMAÑO DEL JUEGO
========================= */

function resizeGame() {
  canvas.width = Math.max(
    320,
    Math.floor(canvas.clientWidth)
  );

  canvas.height = Math.max(
    420,
    Math.floor(canvas.clientHeight)
  );

  if (!gameRunning) {
    drawBackground();
  }
}

/* =========================
   CREAR BLOQUES
========================= */

function addPlatform(
  x,
  y,
  width,
  height = 20
) {
  level.platforms.push({
    x,
    y,
    width,
    height
  });
}

function addGround(
  x,
  width
) {
  addPlatform(
    x,
    level.groundY,
    width,
    canvas.height - level.groundY
  );
}

function addSpike(
  x,
  width = 30
) {
  level.spikes.push({
    x,
    y: level.groundY - 30,
    width,
    height: 30
  });
}

/* =========================
   CREAR NIVEL
========================= */

function buildLevel() {
  level.groundY =
    canvas.height - 85;

  level.platforms = [];
  level.spikes = [];

  if (currentLevel === 1) {
    buildLevelOne();
  }

  if (currentLevel === 2) {
    buildLevelTwo();
  }

  if (currentLevel === 3) {
    buildLevelThree();
  }

  player.x = 60;

  player.y =
    level.groundY -
    player.height;

  player.velocityY = 0;

  player.onGround = true;

  cameraX = 0;

  leftPressed = false;
  rightPressed = false;

  progressFill.style.width =
    "0%";
}

/* =========================
   NIVEL 1
========================= */

function buildLevelOne() {
  worldWidth = 2200;

  addGround(
    0,
    340
  );

  addGround(
    450,
    300
  );

  addGround(
    860,
    310
  );

  addGround(
    1290,
    300
  );

  addGround(
    1710,
    490
  );

  addPlatform(
    280,
    level.groundY - 90,
    120
  );

  addPlatform(
    690,
    level.groundY - 120,
    110
  );

  addPlatform(
    1110,
    level.groundY - 100,
    120
  );

  addPlatform(
    1530,
    level.groundY - 125,
    110
  );

  addSpike(560);

  addSpike(960);

  addSpike(1390);

  addSpike(1870);

  addSpike(1930);

  level.door = {
    x: 2110,
    y: level.groundY - 65,
    width: 42,
    height: 65
  };
}

/* =========================
   NIVEL 2
========================= */

function buildLevelTwo() {
  worldWidth = 3000;

  addGround(
    0,
    280
  );

  addGround(
    400,
    230
  );

  addGround(
    760,
    250
 
