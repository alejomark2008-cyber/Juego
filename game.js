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
   ESTADO GENERAL
========================= */

let running = false;
let screenMode = "start";
let currentLevel = 1;
let deaths = 0;

let moveLeft = false;
let moveRight = false;

let animationId = 0;

let cameraX = 0;
let worldWidth = 2600;

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
  surpriseSpikes: [],
  fallingPlatforms: [],
  door: null
};

/* =========================
   CANVAS
========================= */

function resizeCanvas() {
  canvas.width = Math.max(
    320,
    canvas.clientWidth || 360
  );

  canvas.height = Math.max(
    430,
    canvas.clientHeight || 500
  );

  if (!running) {
    drawBackground();
  }
}

/* =========================
   CREAR OBJETOS
========================= */

function addGround(x, width) {
  world.platforms.push({
    x: x,
    y: world.groundY,
    width: width,
    height: canvas.height - world.groundY
  });
}

function addPlatform(x, y, width) {
  world.platforms.push({
    x: x,
    y: y,
    width: width,
    height: 18
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

function addSurpriseSpike(triggerX, x) {
  world.surpriseSpikes.push({
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
   CREAR NIVEL
========================= */

function createLevel() {
  world.groundY =
    canvas.height - 88;

  world.platforms = [];
  world.spikes = [];
  world.surpriseSpikes = [];
  world.fallingPlatforms = [];

  cameraX = 0;

  if (currentLevel === 1) {
    createLevel1();
  } else if (currentLevel === 2) {
    createLevel2();
  } else {
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

  addSurpriseSpike(
    1350,
    1460
  );

  addSurpriseSpike(
    1880,
    1990
  );

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
    
