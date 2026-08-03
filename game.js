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
let gameWon = false;
let animationId = null;

let level = 1;
let deaths = 0;

let moveLeft = false;
let moveRight = false;

const player = {
  x: 45,
  y: 0,
  width: 27,
  height: 38,
  speed: 4.2,
  velocityY: 0,
  gravity: 0.62,
  jumpPower: -11.8,
  onGround: false
};

let world = {
  groundY: 0,
  platforms: [],
  spikes: [],
  door: null,
  triggerTrap: null,
  trapActivated: false
};

function resizeCanvas() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = Math.max(width, 320);
  canvas.height = Math.max(height, 450);

  if (!running) {
    drawStartPreview();
  }
}

function createLevel() {
  const w = canvas.width;
  const h = canvas.height;

  const groundY = h - 86;

  world.groundY = groundY;

  world.platforms = [
    {
      x: 0,
      y: groundY,
      width: w * 0.30,
      height: h - groundY
    },

    {
      x: w * 0.42,
      y: groundY - 58,
      width: w * 0.19,
      height: 18
    },

    {
      x: w * 0.69,
      y: groundY - 105,
      width: w * 0.17,
      height: 18
    },

    {
      x: w * 0.88,
      y: groundY,
      width: w * 0.12,
      height: h - groundY
    }
  ];

  world.spikes = [];

  world.triggerTrap = {
    x: w * 0.54,
    activated: false
  };

  world.trapActivated = false;

  world.door = {
    x: w - 58,
    y: groundY - 62,
    width: 34,
    height: 62
  };

  resetPlayer(false);
}

function resetPlayer(countDeath = true) {
  if (countDeath) {
    deaths++;

    deathCount.textContent = deaths;
  }

  player.x = 42;

  player.y =
    world.groundY -
    player.height;

  player.velocityY = 0;

  player.onGround = true;

  moveLeft = false;
  moveRight = false;

  world.spikes = [];

  world.trapActivated = false;

  if (world.triggerTrap) {
    world.triggerTrap.activated = false;
  }
}

function startGame() {
  running = true;
  gameWon = false;

  level = 1;
  deaths = 0;

  levelNumber.textContent = level;
  deathCount.textContent = deaths;

  progressFill.style.width = "0%";

  startButton.textContent = "JUGAR";

  startScreen.classList.add("hidden");

  createLevel();

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  gameLoop();
}

function update() {
  if (moveLeft) {
    player.x -= player.speed;
  }

  if (moveRight) {
    player.x += player.speed;
  }

  player.velocityY += player.gravity;

  player.y += player.velocityY;

  player.onGround = false;

  resolvePlatforms();

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

  activateTrap();

  checkSpikes();

  checkDoor();

  updateProgress();
}

function resolvePlatforms() {
  for (
    const platform of world.platforms
  ) {
    const wasAbove =
      player.y +
      player.height -
      player.velocityY <=
      platform.y + 5;

    const overlapsX =
      player.x +
      player.width >
      platform.x &&
      player.x <
      platform.x +
      platform.width;

    const hitsTop =
      player.y +
      player.height >=
      platform.y &&
      player.y +
      player.height <=
      platform.y + 24;

    if (
      overlapsX &&
      wasAbove &&
      hitsTop &&
      player.velocityY >= 0
    ) {
      player.y =
        platform.y -
        player.height;

      player.velocityY = 0;

      player.onGround = true;
    }
  }

  if (
    player.y >
    canvas.height + 80
  ) {
    resetPlayer(true);
  }
}

function activateTrap() {
  if (
    !world.triggerTrap ||
    world.trapActivated
  ) {
    return;
  }

  if (
    player.x >
    world.triggerTrap.x
  ) {
    world.trapActivated = true;

    world.triggerTrap.activated = true;

    world.spikes.push({
      x: canvas.width * 0.61,
      y: world.groundY - 30,
      width: 26,
      height: 30
    });
  }
}

function checkSpikes() {
  for (
    const spike of world.spikes
  ) {
    const hit =
      player.x +
      player.width >
      spike.x + 4 &&
      player.x <
      spike.x +
      spike.width - 4 &&
      player.y +
      player.height >
      spike.y + 8 &&
      player.y <
      spike.y +
      spike.height;

    if (hit) {
      resetPlayer(true);

      return;
    }
  }
}

function checkDoor() {
  const door = world.door;

  const touchingDoor =
    player.x +
    player.width >
    door.x &&
    player.x <
    door.x +
    door.width &&
    player.y +
    player.height >
    door.y &&
    player.y <
    door.y +
    door.height;

  if (touchingDoor) {
    completeLevel();
  }
}

function completeLevel() {
  running = false;

  gameWon = true;

  progressFill.style.width = "100%";

  startButton.textContent =
    "✓ NIVEL COMPLETADO";

  startScreen.classList.remove("hidden");
}

function updateProgress() {
  const finish =
    world.door.x;

  const value =
    Math.max(
      0,
      Math.min(
        100,
        (
          player.x /
          finish
        ) * 100
      )
    );

  progressFill.style.width =
    value + "%";
}

function jump() {
  if (
    running &&
    player.onGround
  ) {
    player.velocityY =
      player.jumpPower;

    player.onGround = false;
  }
}

function draw() {
  drawBackground();

  drawPlatforms();

  drawDoor();

  drawSpikes();

  drawPlayer();
}

function drawBackground() {
  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
    );

  gradient.addColorStop(
    0,
    "#1d252e"
  );

  gradient.addColorStop(
    0.5,
    "#090d12"
  );

  gradient.addColorStop(
    1,
    "#020304"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.strokeStyle =
    "rgba(210,225,240,0.06)";

  ctx.lineWidth = 1;

  for (
    let x = 0;
    x <= canvas.width;
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
    y <= canvas.height;
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

function drawPlatforms() {
  for (
    const platform of world.platforms
  ) {
    const gradient =
      ctx.createLinearGradient(
        platform.x,
        platform.y,
        platform.x,
        platform.y +
        platform.height
      );

    gradient.addColorStop(
      0,
      "#e8edf2"
    );

    gradient.addColorStop(
      0.08,
      "#89949f"
    );

    gradient.addColorStop(
      0.3,
      "#252c33"
    );

    gradient.addColorStop(
      1,
      "#101419"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );

    ctx.fillStyle =
      "rgba(255,255,255,0.45)";

    ctx.fillRect(
      platform.x,
      platform.y,
      platform.width,
      3
    );
  }
}

function drawSpikes() {
  for (
    const spike of world.spikes
  ) {
    ctx.save();

    ctx.shadowColor =
      "#ffffff";

    ctx.shadowBlur = 10;

    ctx.fillStyle =
      "#e8edf2";

    ctx.beginPath();

    ctx.moveTo(
      spike.x,
      spike.y +
      spike.height
    );

    ctx.lineTo(
      spike.x +
      spike.width / 2,
      spike.y
    );

    ctx.lineTo(
      spike.x +
      spike.width,
      spike.y +
      spike.height
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();
  }
}

function drawDoor() {
  const door =
    world.door;

  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 18;

  ctx.fillStyle =
    "#dfe7ee";

  ctx.fillRect(
    door.x,
    door.y,
    door.width,
    door.height
  );

  ctx.fillStyle =
    "#11161b";

  ctx.fillRect(
    door.x + 6,
    door.y + 7,
    door.width - 12,
    door.height - 7
  );

  ctx.fillStyle =
    "#e9eef3";

  ctx.beginPath();

  ctx.arc(
    door.x +
    door.width - 9,
    door.y +
    door.height / 2,
    2.5,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}

function drawPlayer() {
  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 18;

  const gradient =
    ctx.createLinearGradient(
      player.x,
      player.y,
      player.x,
      player.y +
      player.height
    );

  gradient.addColorStop(
    0,
    "#ffffff"
  );

  gradient.addColorStop(
    1,
    "#9da9b4"
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
    4,
    4
  );

  ctx.fillRect(
    player.x + 17,
    player.y + 10,
    4,
    4
  );

  ctx.fillRect(
    player.x + 9,
    player.y + 24,
    9,
    3
  );

  ctx.restore();
}

function drawStartPreview() {
  drawBackground();
}

function gameLoop() {
  if (!running) {
    return;
  }

  update();

  draw();

  animationId =
    requestAnimationFrame(
      gameLoop
    );
}

function setButtonEvents(
  button,
  action
) {
  button.addEventListener(
    "pointerdown",
    event => {
      event.preventDefault();

      action(true);
    }
  );

  button.addEventListener(
    "pointerup",
    event => {
      event.preventDefault();

      action(false);
    }
  );

  button.addEventListener(
    "pointercancel",
    event => {
      event.preventDefault();

      action(false);
    }
  );

  button.addEventListener(
    "pointerleave",
    event => {
      event.preventDefault();

      action(false);
    }
  );
}

setButtonEvents(
  leftButton,
  value => {
    moveLeft = value;
  }
);

setButtonEvents(
  rightButton,
  value => {
    moveRight = value;
  }
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
      moveLeft = true;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      moveRight = true;
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
      moveLeft = false;
    }

    if (
      key === "d" ||
      key === "arrowright"
    ) {
      moveRight = false;
    }
  }
);

startButton.addEventListener(
  "click",
  startGame
);

window.addEventListener(
  "resize",
  () => {
    resizeCanvas();

    if (running) {
      createLevel();
    }
  }
);

resizeCanvas();
