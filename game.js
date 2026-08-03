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

/* =========================
   ESTADO DEL JUEGO
========================= */

let gameRunning = false;
let gameState = "start";

let currentLevel = 1;
let deaths = 0;

let moveLeft = false;
let moveRight = false;

let animationId = null;

let cameraX = 0;
let worldWidth = 2800;

const player = {
  x: 55,
  y: 0,
  width: 28,
  height: 40,
  speed: 4.5,
  velocityY: 0,
  gravity: 0.62,
  jumpPower: -12,
  onGround: false
};

const world = {
  groundY: 0,
  platforms: [],
  spikes: [],
  hiddenSpikes: [],
  fallingPlatforms: [],
  door: null
};

/* =========================
   CANVAS
========================= */

function resizeCanvas() {
  const width = canvas.clientWidth || 360;
  const height = canvas.clientHeight || 500;

  canvas.width = Math.max(320, width);
  canvas.height = Math.max(430, height);

  if (!gameRunning) {
    drawBackground();
  }
}

/* =========================
   AYUDAS PARA CREAR MAPAS
========================= */

function addGround(x, width) {
  world.platforms.push({
    x: x,
    y: world.groundY,
    width: width,
    height: canvas.height - world.groundY,
    type: "ground"
  });
}

function addPlatform(x, y, width) {
  world.platforms.push({
    x: x,
    y: y,
    width: width,
    height: 18,
    type: "platform"
  });
}

function addSpike(x, width = 28) {
  world.spikes.push({
    x: x,
    y: world.groundY - 30,
    width: width,
    height: 30
  });
}

function addHiddenSpike(triggerX, x) {
  world.hiddenSpikes.push({
    triggerX: triggerX,
    x: x,
    y: world.groundY - 31,
    width: 30,
    height: 31,
    active: false
  });
}

function addFallingPlatform(x, y, width) {
  world.fallingPlatforms.push({
    x: x,
    startY: y,
    y: y,
    width: width,
    height: 18,
    falling: false,
    velocityY: 0
  });
}

/* =========================
   CREAR EL NIVEL
========================= */

function createLevel() {
  world.groundY = canvas.height - 88;

  world.platforms = [];
  world.spikes = [];
  world.hiddenSpikes = [];
  world.fallingPlatforms = [];

  cameraX = 0;

  if (currentLevel === 1) {
    createLevel1();
  }

  if (currentLevel === 2) {
    createLevel2();
  }

  if (currentLevel === 3) {
    createLevel3();
  }

  resetPlayer(false);
}

/* =========================
   NIVEL 1
========================= */

function createLevel1() {
  worldWidth = 2600;

  addGround(0, 380);
  addGround(470, 340);
  addGround(930, 330);
  addGround(1390, 340);
  addGround(1860, 300);
  addGround(2290, 310);

  addPlatform(
    330,
    world.groundY - 80,
    110
  );

  addPlatform(
    690,
    world.groundY - 105,
    120
  );

  addPlatform(
    1120,
    world.groundY - 95,
    110
  );

  addPlatform(
    1580,
    world.groundY - 120,
    120
  );

  addPlatform(
    2040,
    world.groundY - 100,
    120
  );

  addSpike(590);
  addSpike(1040);
  addSpike(1510);
  addSpike(1970);

  addHiddenSpike(1350, 1460);
  addHiddenSpike(1880, 1990);

  addFallingPlatform(
    820,
    world.groundY - 90,
    90
  );

  world.door = {
    x: 2510,
    y: world.groundY - 66,
    width: 42,
    height: 66
  };
}

/* =========================
   NIVEL 2
========================= */

function createLevel2() {
  worldWidth = 3400;

  addGround(0, 300);
  addGround(420, 260);
  addGround(810, 230);
  addGround(1160, 280);
  addGround(1570, 250);
  addGround(1940, 270);
  addGround(2340, 280);
  addGround(2760, 640);

  addPlatform(
    270,
    world.groundY - 95,
    120
  );

  addPlatform(
    650,
    world.groundY - 125,
    110
  );

  addPlatform(
    1010,
    world.groundY - 100,
    120
  );

  addPlatform(
    1400,
    world.groundY - 145,
    120
  );

  addPlatform(
    1800,
    world.groundY - 105,
    110
  );

  addPlatform(
    2190,
    world.groundY - 135,
    110
  );

  addPlatform(
    2600,
    world.groundY - 110,
    120
  );

  addSpike(510);
  addSpike(890);
  addSpike(1230);
  addSpike(1290);
  addSpike(1660);
  addSpike(2020);
  addSpike(2430);
  addSpike(2490);

  addHiddenSpike(960, 1070);
  addHiddenSpike(1740, 1850);
  addHiddenSpike(2530, 2660);

  addFallingPlatform(
    730,
    world.groundY - 105,
    75
  );

  addFallingPlatform(
    1510,
    world.groundY - 115,
    80
  );

  addFallingPlatform(
    2270,
    world.groundY - 110,
    80
  );

  world.door = {
    x: 3270,
    y: world.groundY - 66,
    width: 42,
    height: 66
  };
}

/* =========================
   NIVEL 3
========================= */

function createLevel3() {
  worldWidth = 4200;

  addGround(0, 280);
  addGround(410, 230);
  addGround(770, 210);
  addGround(1110, 250);
  addGround(1500, 210);
  addGround(1850, 240);
  addGround(2240, 210);
  addGround(2590, 230);
  addGround(2970, 220);
  addGround(3340, 860);

  addPlatform(
    250,
    world.groundY - 100,
    110
  );

  addPlatform(
    620,
    world.groundY - 135,
    110
  );

  addPlatform(
    970,
    world.groundY - 105,
    110
  );

  addPlatform(
    1360,
    world.groundY - 150,
    110
  );

  addPlatform(
    1740,
    world.groundY - 115,
    110
  );

  addPlatform(
    2100,
    world.groundY - 150,
    110
  );

  addPlatform(
    2480,
    world.groundY - 115,
    110
  );

  addPlatform(
    2840,
    world.groundY - 145,
    110
  );

  addPlatform(
    3210,
    world.groundY - 110,
    110
  );

  addSpike(480);
  addSpike(850);
  addSpike(1180);
  addSpike(1240);
  addSpike(1570);
  addSpike(1910);
  addSpike(1970);
  addSpike(2310);
  addSpike(2660);
  addSpike(2720);
  addSpike(3040);
  addSpike(3100);

  addHiddenSpike(590, 700);
  addHiddenSpike(1320, 1440);
  addHiddenSpike(2040, 2160);
  addHiddenSpike(2770, 2890);
  addHiddenSpike(3260, 3380);

  addFallingPlatform(
    700,
    world.groundY - 110,
    75
  );

  addFallingPlatform(
    1450,
    world.groundY - 125,
    80
  );

  addFallingPlatform(
    2180,
    world.groundY - 120,
    80
  );

  addFallingPlatform(
    2920,
    world.groundY - 120,
    80
  );

  world.door = {
    x: 4070,
    y: world.groundY - 66,
    width: 42,
    height: 66
  };
}

/* =========================
   INICIAR Y REINICIAR
========================= */

function startNewGame() {
  currentLevel = 1;
  deaths = 0;

  levelNumber.textContent = currentLevel;
  deathCount.textContent = deaths;

  progressFill.style.width = "0%";

  createLevel();

  startScreen.classList.add("hidden");

  gameState = "playing";
  gameRunning = true;

  cancelAnimationFrame(animationId);

  gameLoop();
}

function continueGame() {
  createLevel();

  startScreen.classList.add("hidden");

  gameState = "playing";
  gameRunning = true;

  cancelAnimationFrame(animationId);

  gameLoop();
}

function resetPlayer(countDeath = true) {
  if (countDeath) {
    deaths++;

    deathCount.textContent = deaths;
  }

  player.x = 55;

  player.y =
    world.groundY -
    player.height;

  player.velocityY = 0;

  player.onGround = true;

  moveLeft = false;
  moveRight = false;

  cameraX = 0;

  world.hiddenSpikes.forEach(
    trap => {
      trap.active = false;
    }
  );

  world.fallingPlatforms.forEach(
    block => {
      block.y = block.startY;
      block.falling = false;
      block.velocityY = 0;
    }
  );
}

/* =========================
   ACTUALIZAR
========================= */

function updateGame() {
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

  updateTraps();

  if (player.x < 0) {
    player.x = 0;
  }

  if (
    player.x +
    player.width >
    worldWidth
  ) {
    player.x =
      worldWidth -
      player.width;
  }

  if (
    player.y >
    canvas.height + 120
  ) {
    resetPlayer(true);
  }

  checkSpikes();

  checkDoor();

  updateCamera();

  updateProgress();
}

/* =========================
   PLATAFORMAS
========================= */

function resolvePlatforms() {
  const blocks = [
    ...world.platforms,
    ...world.fallingPlatforms
  ];

  for (const block of blocks) {
    const previousBottom =
      player.y +
      player.height -
      player.velocityY;

    const currentBottom =
      player.y +
      player.height;

    const overlapsX =
      player.x +
      player.width >
      block.x &&
      player.x <
      block.x +
      block.width;

    const landsOnTop =
      previousBottom <=
      block.y + 8 &&
      currentBottom >=
      block.y &&
      player.velocityY >= 0;

    if (
      overlapsX &&
      landsOnTop
    ) {
      player.y =
        block.y -
        player.height;

      player.velocityY = 0;

      player.onGround = true;

      if (
        world.fallingPlatforms.includes(
          block
        )
      ) {
        block.falling = true;
      }
    }
  }
}

/* =========================
   TRAMPAS
========================= */

function updateTraps() {
  world.hiddenSpikes.forEach(
    trap => {
      if (
        player.x >
        trap.triggerX
      ) {
        trap.active = true;
      }
    }
  );

  world.fallingPlatforms.forEach(
    block => {
      if (block.falling) {
        block.velocityY += 0.42;

        block.y +=
          block.velocityY;
      }
    }
  );
}

function checkSpikes() {
  const allSpikes = [
    ...world.spikes,
    ...world.hiddenSpikes.filter(
      trap => trap.active
    )
  ];

  for (const trap of allSpikes) {
    const hit =
      player.x +
      player.width >
      trap.x + 4 &&

      player.x <
      trap.x +
      trap.width - 4 &&

      player.y +
      player.height >
      trap.y + 8 &&

      player.y <
      trap.y +
      trap.height;

    if (hit) {
      resetPlayer(true);

      return;
    }
  }
}

/* =========================
   PUERTA
========================= */

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
  gameRunning = false;

  cancelAnimationFrame(
    animationId
  );

  progressFill.style.width = "100%";

  if (currentLevel < 3) {
    currentLevel++;

    levelNumber.textContent =
      currentLevel;

    gameState = "next";

    startButton.textContent =
      "CONTINUAR AL NIVEL " +
      currentLevel;

    startScreen.classList.remove(
      "hidden"
    );
  } else {
    gameState = "finished";

    startButton.textContent =
      "✓ PROTOTIPO COMPLETADO";

    startScreen.classList.remove(
      "hidden"
    );
  }
}

/* =========================
   CÁMARA
========================= */

function updateCamera() {
  const target =
    player.x -
    canvas.width * 0.35;

  cameraX +=
    (target - cameraX) *
    0.09;

  cameraX =
    Math.max(
      0,
      Math.min(
        cameraX,
        worldWidth -
        canvas.width
      )
    );
}

function updateProgress() {
  const progress =
    Math.max(
      0,
      Math.min(
        100,
        (
          player.x /
          world.door.x
        ) * 100
      )
    );

  progressFill.style.width =
    progress + "%";
}

/* =========================
   SALTAR
========================= */

function jump() {
  if (
    gameRunning &&
    player.onGround
  ) {
    player.velocityY =
      player.jumpPower;

    player.onGround = false;
  }
}

/* =========================
   DIBUJAR
========================= */

function drawGame() {
  drawBackground();

  ctx.save();

  ctx.translate(
    -cameraX,
    0
  );

  world.platforms.forEach(
    drawBlock
  );

  world.fallingPlatforms.forEach(
    drawBlock
  );

  world.spikes.forEach(
    drawSpike
  );

  world.hiddenSpikes.forEach(
    trap => {
      if (trap.active) {
        drawSpike(trap);
      }
    }
  );

  drawDoor();

  drawPlayer();

  ctx.restore();
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
    "#202a34"
  );

  gradient.addColorStop(
    0.5,
    "#080d12"
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
    "rgba(220,235,250,0.05)";

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

function drawBlock(block) {
  const gradient =
    ctx.createLinearGradient(
      block.x,
      block.y,
      block.x,
      block.y +
      block.height
    );

  gradient.addColorStop(
    0,
    "#e7edf2"
  );

  gradient.addColorStop(
    0.08,
    "#7c8792"
  );

  gradient.addColorStop(
    0.3,
    "#242b32"
  );

  gradient.addColorStop(
    1,
    "#0d1217"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    block.x,
    block.y,
    block.width,
    block.height
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.45)";

  ctx.fillRect(
    block.x,
    block.y,
    block.width,
    3
  );
}

function drawSpike(trap) {
  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 10;

  ctx.fillStyle =
    "#e7edf2";

  ctx.beginPath();

  ctx.moveTo(
    trap.x,
    trap.y +
    trap.height
  );

  ctx.lineTo(
    trap.x +
    trap.width / 2,
    trap.y
  );

  ctx.lineTo(
    trap.x +
    trap.width,
    trap.y +
    trap.height
  );

  ctx.closePath();

  ctx.fill();

  ctx.restore();
}

function drawDoor() {
  const door = world.door;

  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 20;

  ctx.fillStyle =
    "#e5edf4";

  ctx.fillRect(
    door.x,
    door.y,
    door.width,
    door.height
  );

  ctx.fillStyle =
    "#0a1015";

  ctx.fillRect(
    door.x + 6,
    door.y + 7,
    door.width - 12,
    door.height - 7
  );

  ctx.fillStyle =
    "#ffffff";

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
    "#9ca8b3"
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
    player.x + 18,
    player.y + 10,
    4,
    4
  );

  ctx.fillRect(
    player.x + 9,
    player.y + 25,
    10,
    3
  );

  ctx.restore();
}

/* =========================
   BUCLE
========================= */

function gameLoop() {
  if (!gameRunning) {
    return;
  }

  updateGame();

  drawGame();

  animationId =
    requestAnimationFrame(
      gameLoop
    );
}

/* =========================
   BOTÓN PRINCIPAL
========================= */

startButton.addEventListener(
  "click",
  function () {
    if (
      gameState === "start"
    ) {
      startNewGame();
      return;
    }

    if (
      gameState === "next"
    ) {
      continueGame();
      return;
    }

    if (
      gameState === "finished"
    ) {
      gameState = "start";

      startButton.textContent =
        "▶ JUGAR";

      startNewGame();
    }
  }
);

/* =========================
   CONTROLES TÁCTILES
========================= */

function configureMoveButton(
  button,
  direction
) {
  button.addEventListener(
    "pointerdown",
    event => {
      event.preventDefault();

      if (
        direction === "left"
      ) {
        moveLeft = true;
      }

      if (
        direction === "right"
      ) {
        moveRight = true;
      }
    }
  );

  function stop() {
    if (
      direction === "left"
    ) {
      moveLeft = false;
    }

    if (
      direction === "right"
    ) {
      moveRight = false;
    }
  }

  button.addEventListener(
    "pointerup",
    stop
  );

  button.addEventListener(
    "pointerleave",
    stop
  );

  button.addEventListener(
    "pointercancel",
    stop
  );
}

configureMoveButton(
  leftButton,
  "left"
);

configureMoveButton(
  rightButton,
  "right"
);

jumpButton.addEventListener(
  "pointerdown",
  event => {
    event.preventDefault();

    jump();
  }
);

/* =========================
   TECLADO
========================= */

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

/* =========================
   INICIO
========================= */

window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();

drawBackground();
