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

let running = false;
let animation;

let level = 1;
let retries = 0;

let left = false;
let right = false;

let player = {
  x: 35,
  y: 0,
  width: 28,
  height: 40,
  speed: 4,
  velocityY: 0,
  jumping: false
};

let obstacles = [];

function resizeCanvas() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width;
  canvas.height = height;

  createLevel();
}

function createLevel() {
  const ground = canvas.height - 95;

  player.x = 35;
  player.y = ground - player.height;
  player.velocityY = 0;
  player.jumping = false;

  obstacles = [];

  const positions = [
    0.30,
    0.55,
    0.78
  ];

  positions.forEach((position, index) => {
    obstacles.push({
      x: canvas.width * position,
      width: 32,
      height: 55 + index * 12
    });
  });

  progressFill.style.width = "0%";
}

function groundY() {
  return canvas.height - 95;
}

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

  for (
    let y = 0;
    y < canvas.height;
    y += 45
  ) {
    ctx.beginPath();

    ctx.moveTo(0, y);

    ctx.lineTo(
      canvas.width,
      y
    );

    ctx.stroke();
  }
}

function drawGround() {
  const y = groundY();

  ctx.fillStyle =
    "#151a20";

  ctx.fillRect(
    0,
    y,
    canvas.width,
    canvas.height - y
  );

  ctx.fillStyle =
    "#d8e0e8";

  ctx.fillRect(
    0,
    y,
    canvas.width,
    3
  );
}

function drawPlayer() {
  ctx.save();

  ctx.shadowColor =
    "white";

  ctx.shadowBlur = 20;

  const gradient =
    ctx.createLinearGradient(
      player.x,
      player.y,
      player.x,
      player.y + player.height
    );

  gradient.addColorStop(
    0,
    "#ffffff"
  );

  gradient.addColorStop(
    1,
    "#aab4be"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  ctx.fillStyle =
    "#111820";

  ctx.fillRect(
    player.x + 6,
    player.y + 10,
    5,
    5
  );

  ctx.fillRect(
    player.x + 17,
    player.y + 10,
    5,
    5
  );

  ctx.restore();
}

function drawObstacles() {
  const ground = groundY();

  obstacles.forEach(
    obstacle => {

      const y =
        ground -
        obstacle.height;

      const gradient =
        ctx.createLinearGradient(
          obstacle.x,
          y,
          obstacle.x,
          ground
        );

      gradient.addColorStop(
        0,
        "#f1f4f7"
      );

      gradient.addColorStop(
        0.3,
        "#747f8a"
      );

      gradient.addColorStop(
        1,
        "#171c21"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        obstacle.x,
        y,
        obstacle.width,
        obstacle.height
      );

    }
  );
}

function updatePlayer() {
  if (left) {
    player.x -=
      player.speed;
  }

  if (right) {
    player.x +=
      player.speed;
  }

  player.velocityY += 0.65;

  player.y +=
    player.velocityY;

  const ground = groundY();

  if (
    player.y +
    player.height >=
    ground
  ) {
    player.y =
      ground -
      player.height;

    player.velocityY = 0;

    player.jumping = false;
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
    !player.jumping
  ) {
    player.velocityY = -12;

    player.jumping = true;
  }
}

function collision(
  obstacle
) {
  const obstacleY =
    groundY() -
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

function restart() {
  retries++;

  deathCount.textContent =
    retries;

  player.x = 35;

  player.y =
    groundY() -
    player.height;

  player.velocityY = 0;

  player.jumping = false;
}

function updateProgress() {
  const finish =
    canvas.width - 45;

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        (
          player.x /
          finish
        ) * 100
      )
    );

  progressFill.style.width =
    percentage + "%";
}

function finishLevel() {
  if (
    level < 5
  ) {
    level++;

    levelNumber.textContent =
      level;

    createLevel();
  } else {
    running = false;

    startScreen.classList.remove(
      "hidden"
    );

    startButton.textContent =
      "✓ COMPLETASTE EL JUEGO";
  }
}

function loop() {
  if (!running) {
    return;
  }

  drawBackground();

  drawGround();

  updatePlayer();

  drawObstacles();

  drawPlayer();

  obstacles.forEach(
    obstacle => {

      if (
        collision(
          obstacle
        )
      ) {
        restart();
      }

    }
  );

  updateProgress();

  if (
    player.x >
    canvas.width - 55
  ) {
    finishLevel();
  }

  animation =
    requestAnimationFrame(
      loop
    );
}

function startGame() {
  running = true;

  level = 1;

  retries = 0;

  levelNumber.textContent =
    "1";

  deathCount.textContent =
    "0";

  startScreen.classList.add(
    "hidden"
  );

  createLevel();

  cancelAnimationFrame(
    animation
  );

  loop();
}

startButton.addEventListener(
  "click",
  startGame
);

function setLeft(
  value
) {
  left = value;
}

function setRight(
  value
) {
  right = value;
}

function stopMovement() {
  left = false;
  right = false;
}

leftButton.addEventListener(
  "pointerdown",
  event => {
    event.preventDefault();

    setLeft(true);
  }
);

leftButton.addEventListener(
  "pointerup",
  stopMovement
);

leftButton.addEventListener(
  "pointerleave",
  stopMovement
);

rightButton.addEventListener(
  "pointerdown",
  event => {
    event.preventDefault();

    setRight(true);
  }
);

rightButton.addEventListener(
  "pointerup",
  stopMovement
);

rightButton.addEventListener(
  "pointerleave",
  stopMovement
);

jumpButton.addEventListener(
  "pointerdown",
  event => {
    event.preventDefault();

    jump();
  }
);

document.addEventListener(
  "keydown",
  event => {

    const key =
      event.key.toLowerCase();

    if (
      key === "a" ||
      key === "arrowleft"
    ) {
      left = true;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      right = true;
    }

    if (
      key === "w" ||
      key === "arrowup" ||
      event.code === "Space"
    ) {
      event.preventDefault();

      jump();
    }

  }
);

document.addEventListener(
  "keyup",
  event => {

    const key =
      event.key.toLowerCase();

    if (
      key === "a" ||
      key === "arrowleft"
    ) {
      left = false;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      right = false;
    }

  }
);

window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();
