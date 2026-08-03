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
let animationId = null;

let level = 1;
let deaths = 0;

let moveLeft = false;
let moveRight = false;

let cameraX = 0;
let worldWidth = 2600;

const player = {
  x: 55,
  y: 0,
  width: 28,
  height: 40,
  speed: 4.4,
  velocityY: 0,
  gravity: 0.62,
  jumpPower: -12.2,
  onGround: false
};

let world = {
  groundY: 0,
  platforms: [],
  spikes: [],
  hiddenSpikes: [],
  fallingPlatforms: [],
  disappearingBlocks: [],
  door: null
};


/* =========================
   TAMAÑO DEL JUEGO
========================= */

function resizeCanvas() {
  canvas.width =
    Math.max(
      320,
      canvas.clientWidth
    );

  canvas.height =
    Math.max(
      480,
      canvas.clientHeight
    );

  if (!running) {
    drawPreview();
  }
}


/* =========================
   CREAR NIVELES
========================= */

function createLevel() {
  world.groundY =
    canvas.height - 88;

  world.platforms = [];

  world.spikes = [];

  world.hiddenSpikes = [];

  world.fallingPlatforms = [];

  world.disappearingBlocks = [];

  cameraX = 0;

  if (level === 1) {
    createLevelOne();
  }

  if (level === 2) {
    createLevelTwo();
  }

  if (level === 3) {
    createLevelThree();
  }

  resetPlayer(false);
}


function ground(x, width) {
  world.platforms.push({
    x: x,
    y: world.groundY,
    width: width,
    height:
      canvas.height -
      world.groundY,
    type: "ground"
  });
}


function platform(
  x,
  y,
  width,
  height = 18
) {
  world.platforms.push({
    x,
    y,
    width,
    height,
    type: "platform"
  });
}


function spike(
  x,
  width = 28
) {
  world.spikes.push({
    x,
    y:
      world.groundY - 30,
    width,
    height: 30
  });
}


function hiddenSpike(
  triggerX,
  spikeX
) {
  world.hiddenSpikes.push({
    triggerX,
    x: spikeX,
    y:
      world.groundY - 32,
    width: 30,
    height: 32,
    active: false
  });
}


function fallingPlatform(
  x,
  y,
  width
) {
  world.fallingPlatforms.push({
    x,
    y,
    width,
    height: 18,
    falling: false,
    velocityY: 0
  });
}


function disappearingBlock(
  x,
  width
) {
  world.disappearingBlocks.push({
    x,
    y: world.groundY,
    width,
    height:
      canvas.height -
      world.groundY,
    active: true,
    timer: 0
  });
}


/* =========================
   NIVEL 1
========================= */

function createLevelOne() {
  worldWidth = 2700;

  ground(0, 380);

  ground(470, 310);

  ground(900, 280);

  ground(1290, 350);

  ground(1760, 300);

  ground(2180, 520);

  platform(
    350,
    world.groundY - 75,
    95
  );

  platform(
    650,
    world.groundY - 110,
    110
  );

  platform(
    1080,
    world.groundY - 100,
    100
  );

  platform(
    1480,
    world.groundY - 85,
    100
  );

  platform(
    1900,
    world.groundY - 105,
    120
  );

  spike(610);

  spike(1020);

  spike(1100);

  spike(1510);

  hiddenSpike(
    1350,
    1450
  );

  hiddenSpike(
    1840,
    1940
  );

  fallingPlatform(
    820,
    world.groundY - 90,
    85
  );

  disappearingBlock(
    1610,
    130
  );

  world.door = {
    x: 2580,
    y:
      world.groundY - 66,
    width: 40,
    height: 66
  };
}


/* =========================
   NIVEL 2
========================= */

function createLevelTwo() {
  worldWidth = 3300;

  ground(0, 300);

  ground(420, 250);

  ground(790, 210);

  ground(1120, 280);

  ground(1540, 220);

  ground(1880, 280);

  ground(2300, 300);

  ground(2730, 570);

  platform(
    280,
    world.groundY - 95,
    110
  );

  platform(
    620,
    world.groundY - 130,
    120
  );

  platform(
    960,
    world.groundY - 100,
    110
  );

  platform(
    1320,
    world.groundY - 145,
    100
  );

  platform(
    1730,
    world.groundY - 110,
    120
  );

  platform(
    2130,
    world.groundY - 135,
    110
  );

  platform(
    2570,
    world.groundY - 100,
    110
  );

  spike(500);

  spike(850);

  spike(1200);

  spike(1260);

  spike(1640);

  spike(1980);

  spike(2390);

  spike(2450);

  hiddenSpike(
    950,
    1040
  );

  hiddenSpike(
    1750,
    1840
  );

  hiddenSpike(
    2580,
    2670
  );

  fallingPlatform(
    720,
    world.groundY - 105,
    70
  );

  fallingPlatform(
    1450,
    world.groundY - 120,
    80
  );

  fallingPlatform(
    2210,
    world.groundY - 115,
    80
  );

  disappearingBlock(
    1390,
    150
  );

  disappearingBlock(
    2150,
    150
  );

  world.door = {
    x: 3170,
    y:
      world.groundY - 66,
    width: 40,
    height: 66
  };
}


/* =========================
   NIVEL 3
========================= */

function createLevelThree() {
  worldWidth = 4000;

  ground(0, 280);

  ground(410, 220);

  ground(760, 190);

  ground(1080, 260);

  ground(1480, 190);

  ground(1810, 230);

  ground(2180, 200);

  ground(2520, 220);

  ground(2890, 210);

  ground(3250, 750);

  platform(
    260,
    world.groundY - 100,
    100
  );

  platform(
    610,
    world.groundY - 135,
    100
  );

  platform(
    940,
    world.groundY - 110,
    110
  );

  platform(
    1300,
    world.groundY - 155,
    100
  );

  platform(
    1670,
    world.groundY - 120,
    110
  );

  platform(
    2030,
    world.groundY - 150,
    110
  );

  platform(
    2380,
    world.groundY - 120,
    110
  );

  platform(
    2740,
    world.groundY - 145,
    110
  );

  platform(
    3110,
    world.groundY - 110,
    110
  );

  spike(470);

  spike(820);

  spike(1140);

  spike(1200);

  spike(1550);

  spike(1880);

  spike(1940);

  spike(2250);

  spike(2600);

  spike(2660);

  spike(2970);

  spike(3040);

  hiddenSpike(
    580,
    690
  );

  hiddenSpike(
    1320,
    1420
  );

  hiddenSpike(
    2010,
    2120
  );

  hiddenSpike(
    2750,
    2860
  );

  hiddenSpike(
    3200,
    3300
  );

  fallingPlatform(
    690,
    world.groundY - 115,
    70
  );

  fallingPlatform(
    1390,
    world.groundY - 125,
    75
  );

  fallingPlatform(
    2110,
    world.groundY - 120,
    75
  );

  fallingPlatform(
    2830,
    world.groundY - 120,
    75
  );

  disappearingBlock(
    950,
    130
  );

  disappearingBlock(
    1670,
    140
  );

  disappearingBlock(
    2380,
    140
  );

  disappearingBlock(
    3100,
    150
  );

  world.door = {
    x: 3870,
    y:
      world.groundY - 66,
    width: 40,
    height: 66
  };
}


/* =========================
   REINICIAR
========================= */

function resetPlayer(
  countDeath = true
) {
  if (countDeath) {
    deaths++;

    deathCount.textContent =
      deaths;
  }

  player.x = 50;

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
      block.falling = false;

      block.velocityY = 0;
    }
  );

  world.disappearingBlocks.forEach(
    block => {
      block.active = true;

      block.timer = 0;
    }
  );
}


/* =========================
   MOVIMIENTO
========================= */

function update() {
  if (moveLeft) {
    player.x -=
      player.speed;
  }

  if (moveRight) {
    player.x +=
      player.speed;
  }

  player.velocityY +=
    player.gravity;

  player.y +=
    player.velocityY;

  player.onGround = false;

  resolvePlatforms();

  updateFallingPlatforms();

  updateHiddenSpikes();

  updateDisappearingBlocks();

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
    canvas.height + 100
  ) {
    resetPlayer(true);
  }

  checkSpikes();

  checkDoor();

  updateCamera();

  updateProgress();
}


/* =========================
   COLISIONES
========================= */

function resolvePlatforms() {
  const allPlatforms = [
    ...world.platforms,
    ...world.fallingPlatforms,
    ...world.disappearingBlocks.filter(
      block =>
        block.active
    )
  ];

  for (
    const block of allPlatforms
  ) {
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

      if (
        world.disappearingBlocks.includes(
          block
        )
      ) {
        block.timer++;
      }
    }
  }
}


/* =========================
   TRAMPAS
========================= */

function updateHiddenSpikes() {
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
}


function updateFallingPlatforms() {
  world.fallingPlatforms.forEach(
    block => {
      if (
        block.falling
      ) {
        block.velocityY +=
          0.45;

        block.y +=
          block.velocityY;
      }
    }
  );
}


function updateDisappearingBlocks() {
  world.disappearingBlocks.forEach(
    block => {
      if (
        block.timer > 15
      ) {
        block.active = false;
      }
    }
  );
}


function checkSpikes() {
  const allSpikes = [
    ...world.spikes,
    ...world.hiddenSpikes.filter(
      trap =>
        trap.active
    )
  ];

  for (
    const trap of allSpikes
  ) {
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
  const door =
    world.door;

  const touching =
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

  if (touching) {
    completeLevel();
  }
}


function completeLevel() {
  running = false;

  progressFill.style.width =
    "100%";

  if (
    level < 3
  ) {
    level++;

    levelNumber.textContent =
      level;

    startButton.textContent =
      "CONTINUAR AL NIVEL " +
      level;

    startScreen.classList.remove(
      "hidden"
    );

    startButton.onclick =
      () => {
        startScreen.classList.add(
          "hidden"
        );

        running = true;

        createLevel();

        gameLoop();
      };

  } else {

    startButton.textContent =
      "✓ PROTOTIPO COMPLETADO";

    startScreen.classList.remove(
      "hidden"
    );
  }
}


/* =========================
   CÁMARA Y PROGRESO
========================= */

function updateCamera() {
  const target =
    player.x -
    canvas.width * 0.35;

  cameraX +=
    (
      target -
      cameraX
    ) * 0.08;

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
  const value =
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
    value + "%";
}


/* =========================
   SALTO
========================= */

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


/* =========================
   DIBUJAR
========================= */

function draw() {
  drawBackground();

  ctx.save();

  ctx.translate(
    -cameraX,
    0
  );

  drawPlatforms();

  drawDisappearingBlocks();

  drawFallingPlatforms();

  drawSpikes();

  drawHiddenSpikes();

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
    "#202933"
  );

  gradient.addColorStop(
    0.5,
    "#090d12"
  );

  gradient.addColorStop(
    1,
    "#020304"
  );

  ctx.fillStyle =
    gradient;

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
    x <
    canvas.width;
    x += 45
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
    y <
    canvas.height;
    y += 45
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


function drawBlock(
  block
) {
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
    "#e8edf2"
  );

  gradient.addColorStop(
    0.08,
    "#818c97"
  );

  gradient.addColorStop(
    0.3,
    "#252c33"
  );

  gradient.addColorStop(
    1,
    "#0f1318"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    block.x,
    block.y,
    block.width,
    block.height
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.5)";

  ctx.fillRect(
    block.x,
    block.y,
    block.width,
    3
  );
}


function drawPlatforms() {
  world.platforms.forEach(
    drawBlock
  );
}


function drawFallingPlatforms() {
  world.fallingPlatforms.forEach(
    drawBlock
  );
}


function drawDisappearingBlocks() {
  world.disappearingBlocks.forEach(
    block => {
      if (
        block.active
      ) {
        drawBlock(block);
      }
    }
  );
}


function drawOneSpike(
  trap
) {
  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 10;

  ctx.fillStyle =
    "#e5ebf0";

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


function drawSpikes() {
  world.spikes.forEach(
    drawOneSpike
  );
}


function drawHiddenSpikes() {
  world.hiddenSpikes.forEach(
    trap => {
      if (
        trap.active
      ) {
        drawOneSpike(
          trap
        );
      }
    }
  );
}


function drawDoor() {
  const door =
    world.door;

  ctx.save();

  ctx.shadowColor =
    "#ffffff";

  ctx.shadowBlur = 20;

  ctx.fillStyle =
    "#e6edf3";

  ctx.fillRect(
    door.x,
    door.y,
    door.width,
    door.height
  );

  ctx.fillStyle =
    "#0c1116";

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
    "#a0acb6"
  );

  ctx.fillStyle =
    gradient;

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


function drawPreview() {
  draw
