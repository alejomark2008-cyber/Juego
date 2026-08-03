const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

startButton.addEventListener("click", function () {
  startScreen.style.display = "none";

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.fillStyle = "#05080b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(60, canvas.height - 125, 30, 40);

  ctx.fillStyle = "#777";
  ctx.fillRect(0, canvas.height - 85, canvas.width, 85);

  alert("¡El juego inició!");
});
