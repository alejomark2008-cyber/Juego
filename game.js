const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");

let playing = false;

let left = false;
let right = false;

const player = {
  x: 60,
  y: 0,
  width: 30,
  height: 40,
  speed: 5,
  velocityY: 0,
  gravity: 0.7,
  jumpPower: -13,
  onGround: false
};

let groundY = 0;

/* AJUSTAR EL TAMAÑO */

function resizeGame() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  groundY = canvas.height - 85;

  if (!playing) {
    drawStartScene();
  }
}

/* INICIAR */

startButton.addEventListener("click", function () {
  startScreen.style.display = "none";

  playing = true;

  player.x = 60;

  player.y =
    groundY -
    player.height;

  player.velocityY = 0;

  requestAnimationFrame(gameLoop);
});

/* MOVIMIENTO */

function update() {

  if (left) {
    player.x -= player.speed;
  }

  if (right) {
    player.x += player.speed;
  }

  if (player.x < 0) {
    player.x = 0;
  }

  if (
    player.x +
    player.width >
    canvas.width
  ) {
    player.x =
      canvas.width -
      player.width;
  }

  player.velocityY +=
    player.gravity;

  player.y +=
    player.velocityY;

  if (
    player.y +
    player.height >=
    groundY
  ) {
    player.y =
      groundY -
      player.height;

    player.velocityY = 0;

    player.onGround = true;
  }

  if (
    player.y >
    canvas.height + 100
  ) {
    player.x = 60;

    player.y =
      groundY -
      player.height;

    player.velocityY = 0;
  }
}

/* SALTAR */

function jump() {

  if (
    playing &&
    player.onGround
  ) {
    player.velocityY =
      player.jumpPower;

    player.onGround = false;
  }
}

/* DIBUJAR */

function draw() {

  const background =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
    );

  background.addColorStop(
    0,
    "#27323c"
  );

  background.addColorStop(
    0.55,
    "#080d12"
  );

  background.addColorStop(
    1,
    "#020304"
  );

  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  /* CUADRÍCULA */

  ctx.strokeStyle =
    "rgba(255,255,255,0.05)";

  for (
    let x = 0;
    x < canvas.width;
    x += 45
  ) {
    ctx.beginPath();

    ctx.moveTo(x, 0);

    ctx.lineTo(
      x,
      canvas.height
    );

    ctx.stroke();
  }

  /* SUELO */

  const floor =
    ctx.createLinearGradient(
      0,
      groundY,
      0,
      canvas.height
    );

  floor.addColorStop(
    0,
    "#d
