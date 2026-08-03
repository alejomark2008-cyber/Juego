const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

const levelNumber = document.getElementById("level-number");
const progressFill = document.getElementById("progress-fill");
const deathCount = document.getElementById("death-count");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");

let gameRunning = false;
let animationId;

let player = {
  x: 90,
  y: 500,
  width: 38,
  height: 52,
  speed: 6,
  velocityY: 0,
  onGround: true
};

let keys = {
  left: false,
  right: false
};

const gravity = 0.7;
const groundY = 552;

let level = 1;
let retries = 0;

const obstacles = [
  { x: 310, width: 45, height: 75 },
  { x: 510, width: 55, height: 110 },
  { x: 730, width: 40, height: 90 },
  { x: 930, width: 65, height: 130 }
];

function drawBackground() {
  const gradient = ctx.createLinearGradient(
    0,
    0,
    0,
    canvas.height
  );

  gradient.addColorStop(
    0,
    "#202832"
  );

  gradient.addColorStop(
    1,
    "#030506"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.strokeStyle =
    "rgba(255,255,255,0.05)";

  ctx.lineWidth = 1;

  for (
    let x = 0;
    x < canvas.width;
    x += 60
  ) {
    ctx.beginPath();

    ctx.moveTo(
      x,
      0
    );

    ctx.lineTo(
      x,
      canvas.height
    );

    ctx.stroke();
  }

  for (
    let y = 0;
    y < canvas.height;
    y += 60
  ) {
    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.lineTo(
      canvas.width,
      y
    );

    ctx.stroke();
  }
}

function drawGround() {
  const groundGradient =
    ctx.createLinearGradient(
      0,
      groundY,
      0,
      canvas.height
    );

  groundGradient.addColorStop(
    0,
    "#5f6b76"
  );

  groundGradient.addColorStop(
    0.08,
    "#20262c"
  );

  groundGradient.addColorStop(
    1,
    "#050607"
  );

  ctx.fillStyle =
    groundGradient;

  ctx.fillRect(
    0,
    groundY,
    canvas.width,
    canvas.height - groundY
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.5)";

  ctx.fillRect(
    0,
    groundY,
    canvas.width,
    3
  );
}

function drawPlayer() {
  ctx.save();

  ctx.shadowColor =
    "rgba(255,255,255,0.9)";

  ctx.shadowBlur = 22;

  const playerGradient =
    ctx.createLinearGradient(
      player.x,
      player.y,
      player.x,
      player.y + player.height
    );

  playerGradient.addColorStop(
    0,
    "#ffffff"
  );

  playerGradient.addColorStop(
    1,
    "#9aa5b0"
  );

  ctx.fillStyle =
    playerGradient;

  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  ctx.fillStyle =
    "#11161b";

  ctx.fillRect(
    player.x + 8,
    player.y + 12,
    7,
    7
  );

  ctx.fillRect(
    player.x + 23,
    player.y + 12,
    7,
    7
  );

  ctx.restore();
}

function drawObstacle(
  obstacle
) {
  const y =
    groundY -
    obstacle.height;

  ctx.save();

  ctx.shadowColor =
    "rgba(210,220,230,0.5)";

  ctx.shadowBlur = 14;

  const obstacleGradient =
    ctx.createLinearGradient(
      obstacle.x,
      y,
      obstacle.x,
      groundY
    );

  obstacleGradient.addColorStop(
    0,
    "#d9e1e8"
  );

  obstacleGradient.addColorStop(
    0.2,
    "#68737e"
  );

  obstacleGradient.addColorStop(
    1,
    "#171c21"
  );

  ctx.fillStyle =
    obstacleGradient;

  ctx.fillRect(
    obstacle.x,
    y,
    obstacle.width,
    obstacle.height
  );

  ctx.restore();
}

function drawFinish() {
  const finishX =
    canvas.width - 95;

  ctx.fillStyle =
    "rgba(255,255,255,0.2)";

  ctx.fillRect(
    finishX,
    130,
    7,
    groundY - 130
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "bold 22px Arial";

  ctx.fillText(
    "FIN",
    finishX - 18,
    115
  );
}

function updatePlayer() {
  if (
    keys.left
  ) {
    player.x -=
      player.speed;
  }

  if (
    keys.right
  ) {
    player.x +=
      player.speed;
  }

  player.velocityY +=
    gravity;

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
    player.x < 0
  ) {
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
}

function jump() {
  if (
    player.onGround
  ) {
    player.velocityY = -15;

    player.onGround = false;
  }
}

function isColliding(
  obstacle
) {
  const obstacleY =
    groundY -
    obstacle.height;

  return (
    player.x <
      obstacle.x +
      obstacle.width &&

    player.x +
      player.width >
      obstacle.x &&

    player.y <
      obstacleY +
      obstacle.height &&

    player.y +
      player.height >
      obstacleY
  );
}

function restartLevel() {
  retries++;

  deathCount.textContent =
    retries;

  player.x = 90;

  player.y =
    groundY -
    player.height;

  player.velocityY = 0;

  player.onGround = true;
}

function updateProgress() {
  const progress =
    Math.max(
      0,
      Math.min(
        100,
        (
          player.x /
          (
            canvas.width -
            player.width
          )
        ) * 100
      )
    );

  progressFill.style.width =
    progress + "%";
}

function nextLevel() {
  if (
    level < 5
  ) {
    level++;

    levelNumber.textContent =
      level;

    player.x = 90;

    player.y =
      groundY -
      player.height;

    player.velocityY = 0;

    progressFill.style.width =
      "0%";
  } else {
    gameRunning = false;

    cancelAnimationFrame(
      animationId
    );

    startScreen.classList.remove(
      "hidden"
    );

    startButton.innerHTML =
      "✓ JUEGO COMPLETADO";

    startButton.disabled =
      false;
  }
}

function gameLoop() {
  if (
    !gameRunning
  ) {
    return;
  }

  drawBackground();

  drawGround();

  drawFinish();

  updatePlayer();

  for (
    const obstacle
    of obstacles
  ) {
    drawObstacle(
      obstacle
    );

    if (
      isColliding(
        obstacle
      )
    ) {
      restartLevel();
    }
  }

  drawPlayer();

  updateProgress();

  if (
    player.x >
    canvas.width - 130
  ) {
    nextLevel();
  }

  animationId =
    requestAnimationFrame(
      gameLoop
    );
}

function startGame() {
  gameRunning = true;

  level = 1;

  retries = 0;

  levelNumber.textContent =
    "1";

  deathCount.textContent =
    "0";

  progressFill.style.width =
    "0%";

  player.x = 90;

  player.y =
    groundY -
    player.height;

  player.velocityY = 0;

  player.onGround = true;

  startScreen.classList.add(
    "hidden"
  );

  startButton.innerHTML =
    "▶ JUGAR";

  cancelAnimationFrame(
    animationId
  );

  gameLoop();
}

startButton.addEventListener(
  "click",
  startGame
);

document.addEventListener(
  "keydown",
  function(event) {

    const key =
      event.key.toLowerCase();

    if (
      key === "a" ||
      key === "arrowleft"
    ) {
      keys.left = true;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      keys.right = true;
    }

    if (
      event.code === "Space" ||
      key === "w" ||
      key === "arrowup"
    ) {
      event.preventDefault();

      jump();
    }

  }
);

document.addEventListener(
  "keyup",
  function(event) {

    const key =
      event.key.toLowerCase();

    if (
      key === "a" ||
      key === "arrowleft"
    ) {
      keys.left = false;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      keys.right = false;
    }

  }
);

function holdButton(
  button,
  action
) {

  button.addEventListener(
    "pointerdown",
    function(event) {

      event.preventDefault();

      action(true);

    }
  );

  button.addEventListener(
    "pointerup",
    function() {

      action(false);

    }
  );

  button.addEventListener(
    "pointerleave",
    function() {

      action(false);

    }
  );

  button.addEventListener(
    "pointercancel",
    function() {

      action(false);

    }
  );

}

holdButton(
  leftButton,
  function(value) {

    keys.left = value;

  }
);

holdButton(
  rightButton,
  function(value) {

    keys.right = value;

  }
);

jumpButton.addEventListener(
  "pointerdown",
  function(event) {

    event.preventDefault();

    jump();

  }
);
