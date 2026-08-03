const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");

let gameStarted = false;

let moveLeft = false;
let moveRight = false;

let playerX = 60;
let playerY = 0;

let playerSpeed = 5;

let velocityY = 0;

let gravity = 0.7;

let jumping = false;

let groundY = 0;

/* AJUSTAR EL CANVAS */

function setupGame() {

  canvas.width =
    canvas.offsetWidth;

  canvas.height =
    canvas.offsetHeight;

  groundY =
    canvas.height - 85;

  playerY =
    groundY - 40;

  drawGame();
}

/* INICIAR EL JUEGO */

startButton.onclick = function () {

  gameStarted = true;

  startScreen.style.display =
    "none";

  playerX = 60;

  playerY =
    groundY - 40;

  velocityY = 0;

  jumping = false;

  gameLoop();
};

/* MOVER A LA IZQUIERDA */

leftButton.onmousedown =
function () {

  moveLeft = true;
};

leftButton.onmouseup =
function () {

  moveLeft = false;
};

leftButton.ontouchstart =
function (event) {

  event.preventDefault();

  moveLeft = true;
};

leftButton.ontouchend =
function (event) {

  event.preventDefault();

  moveLeft = false;
};

/* MOVER A LA DERECHA */

rightButton.onmousedown =
function () {

  moveRight = true;
};

rightButton.onmouseup =
function () {

  moveRight = false;
};

rightButton.ontouchstart =
function (event) {

  event.preventDefault();

  moveRight = true;
};

rightButton.ontouchend =
function (event) {

  event.preventDefault();

  moveRight = false;
};

/* SALTAR */

jumpButton.onclick =
function () {

  jump();
};

jumpButton.ontouchstart =
function (event) {

  event.preventDefault();

  jump();
};

function jump() {

  if (
    gameStarted &&
    !jumping
  ) {

    velocityY = -13;

    jumping = true;
  }
}

/* TECLADO */

document.onkeydown =
function (event) {

  if (
    event.key ===
    "ArrowLeft"
  ) {

    moveLeft = true;
  }

  if (
    event.key ===
    "ArrowRight"
  ) {

    moveRight = true;
  }

  if (
    event.key ===
    "ArrowUp" ||
    event.key ===
    " "
  ) {

    jump();
  }
};

document.onkeyup =
function (event) {

  if (
    event.key ===
    "ArrowLeft"
  ) {

    moveLeft = false;
  }

  if (
    event.key ===
    "ArrowRight"
  ) {

    moveRight = false;
  }
};

/* ACTUALIZAR */

function updateGame() {

  if (moveLeft) {

    playerX -=
      playerSpeed;
  }

  if (moveRight) {

    playerX +=
      playerSpeed;
  }

  if (playerX < 0) {

    playerX = 0;
  }

  if (
    playerX >
    canvas.width - 30
  ) {

    playerX =
      canvas.width - 30;
  }

  velocityY +=
    gravity;

  playerY +=
    velocityY;

  if (
    playerY + 40 >=
    groundY
  ) {

    playerY =
      groundY - 40;

    velocityY = 0;

    jumping = false;
  }
}

/* DIBUJAR */

function drawGame() {

  const background =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
