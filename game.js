const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");

let playing = false;
let left = false;
let right = false;
let animationStarted = false;

let groundY = 0;

const player = {
  x: 60,
  y: 0,
  width: 30,
  height: 40,
  speed: 5,
  velocityY: 0,
  gravity: 0.7,
  jumpForce: -13,
  onGround: true
};

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  groundY = canvas.height - 85;

  if (!playing) {
    player.x = 60;
    player.y = groundY - player.height;

    draw();
  }
}

function startGame() {
  playing = true;

  startScreen.style.display = "none";

  player.x = 60;
  player.y = groundY - player.height;
  player.velocityY = 0;
  player.onGround = true;

  if (!animationStarted) {
    animationStarted = true;
    requestAnimationFrame(gameLoop);
  }
}

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

  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.y + player.height >= groundY) {
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.onGround = true;
  }
}

function jump() {
  if (playing && player.onGround) {
    player.velocityY = player.jumpForce;
    player.onGround = false;
  }
}

function draw() {
  const background = ctx.createLinearGradient(
    0,
    0,
    0,
    canvas.height
  );

  background.addColorStop(0, "#27323c");
  background.addColorStop(1, "#020304");

  ctx.fillStyle = background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.strokeStyle = "rgba(255,255,255,0.05)";

  for (let x = 0; x < canvas.width; x += 45) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  ctx.fillStyle = "#252d34";

  ctx.fillRect(
    0,
    groundY,
    canvas.width,
    canvas.height - groundY
  );

  ctx.fillStyle = "#e8eef2";

  ctx.fillRect(
    0,
    groundY,
    canvas.width,
    5
  );

  const doorX = canvas.width - 75;

  ctx.fillStyle = "#dce5ea";

  ctx.fillRect(
    doorX,
    groundY - 65,
    42,
    65
  );

  ctx.fillStyle = "#071018";

  ctx.fillRect(
    doorX + 6,
    groundY - 58,
    30,
    58
  );

  ctx.shadowColor = "white";
  ctx.shadowBlur = 15;

  ctx.fillStyle = "white";

  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  ctx.shadowBlur = 0;

  ctx.fillStyle = "#111";

  ctx.fillRect(
    player.x + 6,
    player.y + 10,
    4,
    4
  );

  ctx.fillRect(
    player.x + 20,
    player.y + 10,
    4,
    4
  );
}

function gameLoop() {
  if (playing) {
    update();
    draw();
  }

  requestAnimationFrame(gameLoop);
}

/* BOTÓN JUGAR */

startButton.onclick = function () {
  startGame();
};

/* BOTÓN IZQUIERDA */

leftButton.onpointerdown = function () {
  left = true;
};

leftButton.onpointerup = function () {
  left = false;
};

leftButton.onpointercancel = function () {
  left = false;
};

/* BOTÓN DERECHA */

rightButton.onpointerdown = function () {
  right = true;
};

rightButton.onpointerup = function () {
  right = false;
};

rightButton.onpointercancel = function () {
  right = false;
};

/* BOTÓN SALTAR */

jumpButton.onclick = function () {
  jump();
};

/* TECLADO */

document.onkeydown = function (event) {
  if (
    event.key === "ArrowLeft" ||
    event.key.toLowerCase() === "a"
  ) {
    left = true;
  }

  if (
    event.key === "ArrowRight" ||
    event.key.toLowerCase() === "d"
  ) {
    right = true;
  }

  if (
    event.key === "ArrowUp" ||
    event.key === " "
  ) {
    jump();
  }
};

document.onkeyup = function (event) {
  if (
    event.key === "ArrowLeft" ||
    event.key.toLowerCase() === "a"
  ) {
    left = false;
  }

  if (
    event.key === "ArrowRight" ||
    event.key.toLowerCase() === "d"
  ) {
    right = false;
  }
};

window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();
