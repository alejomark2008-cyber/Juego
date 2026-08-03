/* =========================================
   CHAIN RUSH — VERSIÓN 1
   Juego de un jugador con 5 niveles
========================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* Elementos de la interfaz */

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

const levelNumber = document.getElementById("level-number");
const deathCount = document.getElementById("death-count");

const progressFill = document.getElementById("progress-fill");

const gameMessage = document.getElementById("game-message");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const jumpButton = document.getElementById("jump-button");


/* Tamaño interno del juego */

const WIDTH = 1200;
const HEIGHT = 650;


/* Física */

const GRAVITY = 0.72;

const MOVE_SPEED = 0.72;
const MAX_SPEED = 7.2;

const JUMP_POWER = 15.5;

const FRICTION = 0.82;


/* Estado del juego */

let gameStarted = false;

let currentLevel = 0;

let deaths = 0;

let animationId = null;

let lastTime = 0;

let levelChanging = false;


/* Cámara */

let cameraX = 0;


/* Teclado */

const keys = {

  left: false,

  right: false,

  jump: false

};


/* Jugador */

const player = {

  x: 90,

  y: 100,

  width: 34,

  height: 48,

  vx: 0,

  vy: 0,

  onGround: false,

  canJump: true,

  spawnX: 90,

  spawnY: 100

};


/* =========================================
   NIVELES
========================================= */

const levels = [

  /* -------------------------
     NIVEL 1
  -------------------------- */

  {

    name: "DESPERTAR",

    width: 2500,

    start: {
      x: 90,
      y: 470
    },

    platforms: [

      [0, 550, 520, 100],

      [620, 500, 190, 30],

      [900, 440, 180, 30],

      [1180, 510, 210, 30],

      [1490, 450, 200, 30],

      [1800, 390, 190, 30],

      [2080, 470, 420, 30]

    ],

    spikes: [

      [390, 520, 70, 30],

      [720, 470, 45, 30],

      [980, 410, 55, 30],

      [1280, 480, 65, 30],

      [1570, 420, 55, 30],

      [1870, 360, 55, 30]

    ],

    movingPlatforms: [],

    goal: {
      x: 2390,
      y: 400,
      width: 45,
      height: 70
    }

  },


  /* -------------------------
     NIVEL 2
  -------------------------- */

  {

    name: "PULSO DE ACERO",

    width: 3100,

    start: {
      x: 90,
      y: 470
    },

    platforms: [

      [0, 550, 350, 100],

      [450, 480, 150, 30],

      [700, 400, 140, 30],

      [940, 500, 120, 30],

      [1160, 420, 130, 30],

      [1390, 340, 160, 30],

      [1660, 440, 150, 30],

      [1910, 360, 140, 30],

      [2150, 470, 160, 30],

      [2420, 390, 170, 30],

      [2700, 450, 400, 30]

    ],

    spikes: [

      [260, 520, 70, 30],

      [480, 450, 50, 30],

      [750, 370, 45, 30],

      [970, 470, 45, 30],

      [1200, 390, 55, 30],

      [1450, 310, 65, 30],

      [1710, 410, 55, 30],

      [1950, 330, 55, 30],

      [2200, 440, 55, 30],

      [2480, 360, 55, 30]

    ],

    movingPlatforms: [

      {
        x: 300,
        y: 420,

        width: 90,
        height: 22,

        minX: 280,
        maxX: 450,

        speed: 1.5,

        direction: 1
      }

    ],

    goal: {
      x: 2980,
      y: 380,

      width: 45,
      height: 70
    }

  },


  /* -------------------------
     NIVEL 3
  -------------------------- */

  {

    name: "VACÍO MECÁNICO",

    width: 3500,

    start: {
      x: 90,
      y: 470
    },

    platforms: [

      [0, 550, 300, 100],

      [420, 470, 120, 30],

      [650, 390, 110, 30],

      [870, 310, 110, 30],

      [1090, 420, 120, 30],

      [1320, 500, 100, 30],

      [1530, 400, 130, 30],

      [1770, 300, 110, 30],

      [1990, 410, 130, 30],

      [2240, 500, 110, 30],

      [2470, 390, 120, 30],

      [2700, 300, 120, 30],

      [2940, 410, 150, 30],

      [3210, 470, 290, 30]

    ],

    spikes: [

      [200, 520, 55, 30],

      [450, 440, 45, 30],

      [680, 360, 45, 30],

      [900, 280, 45, 30],

      [1120, 390, 50, 30],

      [1340, 470, 45, 30],

      [1570, 370, 55, 30],

      [1800, 270, 45, 30],

      [2020, 380, 55, 30],

      [2270, 470, 45, 30],

      [2500, 360, 50, 30],

      [2730, 270, 50, 30],

      [2980, 380, 60, 30]

    ],

    movingPlatforms: [

      {
        x: 300,
        y: 450,

        width: 85,
        height: 22,

        minX: 280,
        maxX: 430,

        speed: 1.8,

        direction: 1
      },

      {
        x: 1450,
        y: 360,

        width: 90,
        height: 22,

        minX: 1420,
        maxX: 1580,

        speed: 1.7,

        direction: 1
      }

    ],

    goal: {
      x: 3380,
      y: 400,

      width: 45,
      height: 70
    }

  },


  /* -------------------------
     NIVEL 4
  -------------------------- */

  {

    name: "SOBRECARGA",

    width: 4000,

    start: {
      x: 90,
      y: 470
    },

    platforms: [

      [0, 550, 280, 100],

      [390, 460, 110, 30],

      [620, 370, 100, 30],

      [840, 470, 100, 30],

      [1060, 330, 120, 30],

      [1300, 430, 100, 30],

      [1520, 290, 120, 30],

      [1760, 410, 110, 30],

      [1990, 320, 100, 30],

      [2210, 460, 100, 30],

      [2430, 350, 110, 30],

      [2670, 260, 130, 30],

      [2920, 390, 110, 30],

      [3150, 300, 110, 30],

      [3380, 430, 130, 30],

      [3640, 470, 360, 30]

    ],

    spikes: [

      [190, 520, 55, 30],

      [420, 430, 45, 30],

      [650, 340, 45, 30],

      [870, 440, 45, 30],

      [1090, 300, 55, 30],

      [1330, 400, 45, 30],

      [1550, 260, 55, 30],

      [1790, 380, 45, 30],

      [2020, 290, 45, 30],

      [2240, 430, 45, 30],

      [2460, 320, 50, 30],

      [2710, 230, 55, 30],

      [2950, 360, 50, 30],

      [3180, 270, 50, 30],

      [3420, 400, 55, 30]

    ],

    movingPlatforms: [

      {
        x: 280,
        y: 430,

        width: 85,
        height: 22,

        minX: 260,
        maxX: 400,

        speed: 2,

        direction: 1
      },

      {
        x: 1150,
        y: 380,

        width: 90,
        height: 22,

        minX: 1120,
        maxX: 1300,

        speed: 2.1,

        direction: 1
      },

      {
        x: 2320,
        y: 400,

        width: 90,
        height: 22,

        minX: 2290,
        maxX: 2440,

        speed: 2,

        direction: 1
      }

    ],

    goal: {
      x: 3870,
      y: 400,

      width: 45,
      height: 70
    }

  },


  /* -------------------------
     NIVEL 5
  -------------------------- */

  {

    name: "NÚCLEO FINAL",

    width: 4700,

    start: {
      x: 90,
      y: 470
    },

    platforms: [

      [0, 550, 250, 100],

      [370, 470, 95, 30],

      [580, 370, 90, 30],

      [790, 280, 100, 30],

      [1010, 400, 90, 30],

      [1220, 500, 90, 30],

      [1430, 380, 100, 30],

      [1650, 270, 100, 30],

      [1870, 420, 90, 30],

      [2080, 320, 90, 30],

      [2290, 470, 90, 30],

      [2500, 350, 100, 30],

      [2720, 240, 110, 30],

      [2950, 390, 100, 30],

      [3170, 290, 100, 30],

      [3390, 450, 100, 30],

      [3610, 330, 110, 30],

      [3850, 240, 120, 30],

      [4100, 380, 120, 30],

      [4350, 470, 350, 30]

    ],

    spikes: [

      [160, 520, 50, 30],

      [390, 440, 40, 30],

      [600, 340, 40, 30],

      [820, 250, 45, 30],

      [1030, 370, 45, 30],

      [1240, 470, 40, 30],

      [1460, 350, 45, 30],

      [1680, 240, 45, 30],

      [1890, 390, 45, 30],

      [2100, 290, 45, 30],

      [2310, 440, 40, 30],

      [2530, 320, 45, 30],

      [2760, 210, 50, 30],

      [2980, 360, 45, 30],

      [3200, 260, 45, 30],

      [3420, 420, 45, 30],

      [3640, 300, 50, 30],

      [3890, 210, 55, 30],

      [4140, 350, 55, 30]

    ],

    movingPlatforms: [

      {
        x: 250,
        y: 440,

        width: 85,
        height: 22,

        minX: 230,
        maxX: 380,

        speed: 2.2,

        direction: 1
      },

      {
        x: 900,
        y: 350,

        width: 85,
        height: 22,

        minX: 870,
        maxX: 1020,

        speed: 2.3,

        direction: 1
      },

      {
        x: 1950,
        y: 350,

        width: 90,
        height: 22,

        minX: 1920,
        maxX: 2090,

        speed: 2.4,

        direction: 1
      },

      {
        x: 3290,
        y: 370,

        width: 90,
        height: 22,

        minX: 3260,
        maxX: 3410,

        speed: 2.3,

        direction: 1
      }

    ],

    goal: {
      x: 4580,
      y: 400,

      width: 50,
      height: 70
    }

  }

];


/* =========================================
   INICIAR NIVEL
========================================= */

function loadLevel(index) {

  currentLevel = index;

  const level = levels[currentLevel];

  player.x = level.start.x;

  player.y = level.start.y;

  player.vx = 0;

  player.vy = 0;

  player.spawnX = level.start.x;

  player.spawnY = level.start.y;

  cameraX = 0;

  levelNumber.textContent = currentLevel + 1;

  progressFill.style.width = "0%";

  showMessage(

    "NIVEL " + (currentLevel + 1),

    level.name

  );

}


/* =========================================
   EMPEZAR
========================================= */

startButton.addEventListener(

  "click",

  () => {

    startScreen.classList.add("hidden");

    gameStarted = true;

    deaths = 0;

    deathCount.textContent = deaths;

    loadLevel(0);

    if (!animationId) {

      lastTime = performance.now();

      gameLoop(lastTime);

    }

  }

);


/* =========================================
   TECLADO
========================================= */

window.addEventListener(

  "keydown",

  (event) => {

    const key = event.key.toLowerCase();

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

      key === "w" ||

      key === "arrowup" ||

      key === " "

    ) {

      event.preventDefault();

      keys.jump = true;

    }

  }

);


window.addEventListener(

  "keyup",

  (event) => {

    const key = event.key.toLowerCase();

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

    if (

      key === "w" ||

      key === "arrowup" ||

      key === " "

    ) {

      keys.jump = false;

    }

  }

);


/* =========================================
   BOTONES DE CELULAR
========================================= */

function connectButton(

  button,

  keyName

) {

  button.addEventListener(

    "pointerdown",

    (event) => {

      event.preventDefault();

      keys[keyName] = true;

    }

  );

  button.addEventListener(

    "pointerup",

    () => {

      keys[keyName] = false;

    }

  );

  button.addEventListener(

    "pointercancel",

    () => {

      keys[keyName] = false;

    }

  );

  button.addEventListener(

    "pointerleave",

    () => {

      keys[keyName] = false;

    }

  );

}


connectButton(

  leftButton,

  "left"

);

connectButton(

  rightButton,

  "right"

);

connectButton(

  jumpButton,

  "jump"

);


/* =========================================
   ACTUALIZAR JUEGO
========================================= */

function update() {

  if (!gameStarted) {

    return;

  }

  const level = levels[currentLevel];


  /* Movimiento */

  if (keys.left) {

    player.vx -= MOVE_SPEED;

  }

  if (keys.right) {

    player.vx += MOVE_SPEED;

  }

  if (

    !keys.left &&

    !keys.right

  ) {

    player.vx *= FRICTION;

  }

  player.vx = Math.max(

    -MAX_SPEED,

    Math.min(

      MAX_SPEED,

      player.vx

    )

  );


  /* Salto */

  if (

    keys.jump &&

    player.onGround &&

    player.canJump

  ) {

    player.vy = -JUMP_POWER;

    player.onGround = false;

    player.canJump = false;

  }

  if (!keys.jump) {

    player.canJump = true;

  }


  /* Gravedad */

  player.vy += GRAVITY;

  player.vy = Math.min(

    player.vy,

    18

  );


  /* Movimiento horizontal */

  player.x += player.vx;


  /* Límites */

  if (player.x < 0) {

    player.x = 0;

    player.vx = 0;

  }

  if (

    player.x + player.width >

    level.width

  ) {

    player.x =

      level.width -

      player.width;

    player.vx = 0;

  }


  /* Movimiento vertical */

  player.y += player.vy;

  player.onGround = false;


  /* Plataformas móviles */

  updateMovingPlatforms(

    level

  );


  /* Colisiones */

  resolvePlatformCollisions(

    level.platforms

  );

  resolveMovingPlatformCollisions(

    level.movingPlatforms

  );


  /* Muerte por caer */

  if (

    player.y >

    HEIGHT + 150

  ) {

    respawn();

  }


  /* Pinchos */

  for (

    const spike of

    level.spikes

  ) {

    if (

      playerHitsSpike(

        spike

      )

    ) {

      respawn();

      break;

    }

  }


  /* Meta */

  if (

    rectanglesTouch(

      player,

      level.goal

    )

  ) {

    finishLevel();

  }


  /* Cámara */

  const targetCamera =

    player.x -

    WIDTH * 0.35;

  cameraX +=

    (targetCamera - cameraX)

    * 0.08;

  cameraX = Math.max(

    0,

    Math.min(

      cameraX,

      level.width - WIDTH

    )

  );


  /* Progreso */

  const progress =

    Math.max(

      0,

      Math.min(

        100,

        (

          player.x /

          level.goal.x

        ) * 100

      )

    );

  progressFill.style.width =

    progress + "%";

}


/* =========================================
   PLATAFORMAS MÓVILES
========================================= */

function updateMovingPlatforms(

  level

) {

  for (

    const platform of

    level.movingPlatforms

  ) {

    platform.x +=

      platform.speed *

      platform.direction;

    if (

      platform.x <=

      platform.minX

    ) {

      platform.x =

        platform.minX;

      platform.direction = 1;

    }

    if (

      platform.x >=

      platform.maxX

    ) {

      platform.x =

        platform.maxX;

      platform.direction = -1;

    }

  }

}


/* =========================================
   COLISIONES
========================================= */

function resolvePlatformCollisions(

  platforms

) {

  for (

    const platform of

    platforms

  ) {

    const [

      x,

      y,

      width,

      height

    ] = platform;

    resolveOnePlatform(

      {

        x,

        y,

        width,

        height

      }

    );

  }

}


function resolveMovingPlatformCollisions(

  platforms

) {

  for (

    const platform of

    platforms

  ) {

    resolveOnePlatform(

      platform

    );

  }

}


function resolveOnePlatform(

  platform

) {

  if (

    player.x + player.width >

    platform.x &&

    player.x <

    platform.x +

    platform.width &&

    player.y + player.height >

    platform.y &&

    player.y <

    platform.y +

    platform.height

  ) {

    const previousBottom =

      player.y +

      player.height -

      player.vy;

    if (

      player.vy >= 0 &&

      previousBottom <=

      platform.y + 10

    ) {

      player.y =

        platform.y -

        player.height;

      player.vy = 0;

      player.onGround = true;

    }

    else if (

      player.vy < 0

    ) {

      player.y =

        platform.y +

        platform.height;

      player.vy = 0;

    }

  }

}


/* =========================================
   PINCHOS
========================================= */

function playerHitsSpike(

  spike

) {

  const [

    x,

    y,

    width,

    height

  ] = spike;

  const safeTop = 8;

  return (

    player.x +

    player.width -

    6 >

    x &&

    player.x + 6 <

    x + width &&

    player.y +

    player.height >

    y + safeTop &&

    player.y <

    y + height

  );

}


/* =========================================
   REAPARECER
========================================= */

function respawn() {

  deaths++;

  deathCount.textContent =

    deaths;

  player.x =

    player.spawnX;

  player.y =

    player.spawnY;

  player.vx = 0;

  player.vy = 0;

  cameraX = 0;

  showMessage(

    "REINTENTO",

    "NO TE DETENGAS"

  );

}


/* =========================================
   TERMINAR NIVEL
========================================= */

function finishLevel() {

  if (levelChanging) {

    return;

  }

  levelChanging = true;

  gameStarted = false;

  if (

    currentLevel <

    levels.length - 1

  ) {

    showMessage(

      "NIVEL COMPLETADO",

      "PREPARANDO EL SIGUIENTE"

    );

    setTimeout(

      () => {

        loadLevel(

          currentLevel + 1

        );

        gameStarted = true;

        levelChanging = false;

      },

      1800

    );

  }

  else {

    showMessage(

      "¡NÚCLEO SUPERADO!",

      "HAS COMPLETADO CHAIN RUSH"

    );

    setTimeout(

      () => {

        startScreen

          .classList

          .remove(

            "hidden"

          );

        startButton.innerHTML =

          "<span>↻</span> JUGAR DE NUEVO";

        levelChanging = false;

      },

      2500

    );

  }

}


/* =========================================
   MENSAJES
========================================= */

function showMessage(

  title,

  text

) {

  messageTitle.textContent =

    title;

  messageText.textContent =

    text;

  gameMessage

    .classList

    .add(

      "show"

    );

  clearTimeout(

    showMessage.timeout

  );

  showMessage.timeout =

    setTimeout(

      () => {

        gameMessage

          .classList

          .remove(

            "show"

          );

      },

      1800

    );

}


/* =========================================
   DIBUJAR
========================================= */

function draw() {

  ctx.clearRect(

    0,

    0,

    WIDTH,

    HEIGHT

  );

  drawBackground();

  const level =

    levels[currentLevel];

  ctx.save();

  ctx.translate(

    -cameraX,

    0

  );


  /* Plataformas */

  for (

    const platform of

    level.platforms

  ) {

    drawPlatform(

      platform[0],

      platform[1],

      platform[2],

      platform[3]

    );

  }


  /* Plataformas móviles */

  for (

    const platform of

    level.movingPlatforms

  ) {

    drawPlatform(

      platform.x,

      platform.y,

      platform.width,

      platform.height,

      true

    );

  }


  /* Pinchos */

  for (

    const spike of

    level.spikes

  ) {

    drawSpikes(

      spike[0],

      spike[1],

      spike[2],

      spike[3]

    );

  }


  /* Meta */

  drawGoal(

    level.goal

  );


  /* Jugador */

  drawPlayer();


  ctx.restore();


  /* Información del mapa */

  drawLevelInfo(

    level

  );

}


/* =========================================
   FONDO
========================================= */

function drawBackground() {

  const gradient =

    ctx.createLinearGradient(

      0,

      0,

      0,

      HEIGHT

    );

  gradient.addColorStop(

    0,

    "#171d25"

  );

  gradient.addColorStop(

    0.55,

    "#090c10"

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

    WIDTH,

    HEIGHT

  );


  /* Cuadrícula */

  ctx.save();

  ctx.strokeStyle =

    "rgba(220,235,255,0.055)";

  ctx.lineWidth = 1;

  const grid = 60;

  const offset =

    -(cameraX % grid);

  for (

    let x = offset;

    x < WIDTH;

    x += grid

  ) {

    ctx.beginPath();

    ctx.moveTo(

      x,

      0

    );

    ctx.lineTo(

      x,

      HEIGHT

    );

    ct
