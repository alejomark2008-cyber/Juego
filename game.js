// ==========================================
// TRIVIA DE FÚTBOL - 30 PREGUNTAS
// ==========================================

const preguntas = [

  {
    pregunta: "¿En qué partido Diego Maradona anotó el gol conocido como «La Mano de Dios»?",
    opciones: [
      "Argentina vs. Inglaterra, Mundial de 1986",
      "Argentina vs. Alemania, Mundial de 1986",
      "Argentina vs. Brasil, Copa América de 1987",
      "Argentina vs. Italia, Mundial de 1990"
    ],
    correcta: 0
  },

  {
    pregunta: "¿Cuántos goles anotó Lionel Messi en la Champions League?",
    opciones: [
      "112",
      "121",
      "129",
      "131"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué selección ganó el primer Mundial de fútbol en 1930?",
    opciones: [
      "Argentina",
      "Uruguay",
      "Italia",
      "Brasil"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué equipo ganó la Champions League de la temporada 2018-19?",
    opciones: [
      "Tottenham Hotspur",
      "Barcelona",
      "Liverpool",
      "Ajax"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué jugador marcó el gol decisivo en la final del Mundial de 2010?",
    opciones: [
      "Xavi Hernández",
      "David Villa",
      "Andrés Iniesta",
      "Fernando Torres"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué selección perdió la final del Mundial de 1954 ante Alemania Occidental?",
    opciones: [
      "Hungría",
      "Austria",
      "Suecia",
      "Checoslovaquia"
    ],
    correcta: 0
  },

  {
    pregunta: "¿Quién es el máximo goleador histórico de la Champions League?",
    opciones: [
      "Lionel Messi",
      "Robert Lewandowski",
      "Karim Benzema",
      "Cristiano Ronaldo"
    ],
    correcta: 3
  },

  {
    pregunta: "¿Qué club ganó la primera edición de la Copa de Europa en 1956?",
    opciones: [
      "Benfica",
      "Real Madrid",
      "Milan",
      "Stade de Reims"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué jugador anotó un hat-trick en la final del Mundial de 1966?",
    opciones: [
      "Bobby Charlton",
      "Geoff Hurst",
      "Bobby Moore",
      "Gerd Müller"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué país organizó y ganó el Mundial de 1978?",
    opciones: [
      "Brasil",
      "Argentina",
      "México",
      "Italia"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué club ganó la Champions League en la temporada 2011-12?",
    opciones: [
      "Bayern Múnich",
      "Barcelona",
      "Chelsea",
      "Real Madrid"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 2002?",
    opciones: [
      "Alemania",
      "Francia",
      "Brasil",
      "Italia"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Quién marcó el famoso gol conocido como «el Gol del Siglo» en el Mundial de 1986?",
    opciones: [
      "Jorge Valdano",
      "Diego Maradona",
      "Mario Kempes",
      "Gabriel Batistuta"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 1998?",
    opciones: [
      "Brasil",
      "Italia",
      "Francia",
      "Alemania"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué equipo ganó la Champions League de la temporada 2019-20?",
    opciones: [
      "Paris Saint-Germain",
      "Bayern Múnich",
      "Manchester City",
      "Liverpool"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Quién anotó el gol que dio a España su primer Mundial?",
    opciones: [
      "Fernando Torres",
      "David Villa",
      "Andrés Iniesta",
      "Cesc Fàbregas"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 2014?",
    opciones: [
      "Argentina",
      "Brasil",
      "Alemania",
      "Países Bajos"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué club ganó la Champions League de la temporada 2004-05?",
    opciones: [
      "Milan",
      "Liverpool",
      "Chelsea",
      "Juventus"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué jugador ganó el Balón de Oro de 2007?",
    opciones: [
      "Lionel Messi",
      "Kaká",
      "Cristiano Ronaldo",
      "Ronaldinho"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 2006?",
    opciones: [
      "Francia",
      "Italia",
      "Alemania",
      "Brasil"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué equipo ganó la Champions League de la temporada 2013-14?",
    opciones: [
      "Atlético de Madrid",
      "Real Madrid",
      "Bayern Múnich",
      "Barcelona"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué jugador marcó el gol de la victoria de Alemania en la final del Mundial de 2014?",
    opciones: [
      "Thomas Müller",
      "Miroslav Klose",
      "Mario Götze",
      "Toni Kroos"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué selección ganó la Eurocopa de 2004?",
    opciones: [
      "Portugal",
      "Grecia",
      "Francia",
      "República Checa"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué club ganó la Champions League de la temporada 2008-09?",
    opciones: [
      "Manchester United",
      "Barcelona",
      "Chelsea",
      "Arsenal"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Quién fue el máximo goleador del Mundial de 2002?",
    opciones: [
      "Ronaldo Nazário",
      "Miroslav Klose",
      "Rivaldo",
      "Ronaldinho"
    ],
    correcta: 0
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 2022?",
    opciones: [
      "Francia",
      "Croacia",
      "Argentina",
      "Marruecos"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué club ganó la Champions League de la temporada 2022-23?",
    opciones: [
      "Inter de Milán",
      "Manchester City",
      "Real Madrid",
      "Bayern Múnich"
    ],
    correcta: 1
  },

  {
    pregunta: "¿Qué jugador ganó el Balón de Oro de 2002?",
    opciones: [
      "Ronaldo Nazário",
      "Zinedine Zidane",
      "Roberto Carlos",
      "Rivaldo"
    ],
    correcta: 0
  },

  {
    pregunta: "¿Qué selección ganó el Mundial de 1974?",
    opciones: [
      "Países Bajos",
      "Brasil",
      "Alemania Occidental",
      "Italia"
    ],
    correcta: 2
  },

  {
    pregunta: "¿Qué club ganó la Champions League de la temporada 2016-17?",
    opciones: [
      "Juventus",
      "Real Madrid",
      "Atlético de Madrid",
      "Barcelona"
    ],
    correcta: 1
  }

];


// ==========================================
// VARIABLES
// ==========================================

let preguntaActual = 0;
let puntos = 0;
let respondida = false;


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const btnComenzar = document.getElementById("btnComenzar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

const contador = document.getElementById("contador");
const puntosTexto = document.getElementById("puntos");

const barraProgreso = document.getElementById("barraProgreso");

const numeroPregunta = document.getElementById("numeroPregunta");
const preguntaTexto = document.getElementById("pregunta");

const opciones = document.getElementById("opciones");

const mensaje = document.getElementById("mensaje");

const resultadoPuntos = document.getElementById("resultadoPuntos");
const mensajeFinal = document.getElementById("mensajeFinal");


// ==========================================
// CONECTAR BOTONES
// ==========================================

btnComenzar.addEventListener("click", comenzarJuego);
btnSiguiente.addEventListener("click", siguientePregunta);
btnReiniciar.addEventListener("click", reiniciarJuego);


// ==========================================
// COMENZAR
// ==========================================

function comenzarJuego() {

  preguntaActual = 0;
  puntos = 0;
  respondida = false;

  inicio.classList.remove("activa");
  final.classList.remove("activa");

  juego.classList.add("activa");

  mostrarPregunta();

}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

  const datos = preguntas[preguntaActual];

  respondida = false;

  contador.textContent =
    `PREGUNTA ${preguntaActual + 1} DE ${preguntas.length}`;

  puntosTexto.textContent =
    `${puntos} PUNTOS`;

  numeroPregunta.textContent =
    String(preguntaActual + 1).padStart(2, "0");

  preguntaTexto.textContent =
    datos.pregunta;

  opciones.innerHTML = "";

  mensaje.textContent = "";
  mensaje.className = "";

  btnSiguiente.disabled = true;

  if (preguntaActual === preguntas.length - 1) {

    btnSiguiente.innerHTML =
      "VER RESULTADO <span>→</span>";

  } else {

    btnSiguiente.innerHTML =
      "SIGUIENTE <span>→</span>";

  }

  const progreso =
    (preguntaActual / preguntas.length) * 100;

  barraProgreso.style.width =
    `${progreso}%`;

  datos.opciones.forEach(function(opcion, indice) {

    const boton =
      document.createElement("button");

    boton.type = "button";

    boton.textContent = opcion;

    boton.classList.add("opcion");

    boton.addEventListener("click", function() {

      revisarRespuesta(indice);

    });

    opciones.appendChild(boton);

  });

}


// ==========================================
// REVISAR RESPUESTA
// ==========================================

function revisarRespuesta(respuestaElegida) {

  if (respondida) {

    return;

  }

  respondida = true;

  const datos =
    preguntas[preguntaActual];

  const botones =
    document.querySelectorAll(".opcion");

  botones.forEach(function(boton) {

    boton.disabled = true;

  });

  if (respuestaElegida === datos.correcta) {

    puntos++;

    mensaje.textContent =
      "¡RESPUESTA CORRECTA!";

    mensaje.className =
      "correcto";

  } else {

    mensaje.textContent =
      `INCORRECTO. LA RESPUESTA ERA: ${datos.opciones[datos.correcta]}`;

    mensaje.className =
      "incorrecto";

  }

  botones.forEach(function(boton, indice) {

    if (indice === datos.correcta) {

      boton.classList.add("correcta");

    }

    if (
      indice === respuestaElegida &&
      indice !== datos.correcta
    ) {

      boton.classList.add("incorrecta");

    }

  });

  puntosTexto.textContent =
    `${puntos} PUNTOS`;

  btnSiguiente.disabled = false;

}


// ==========================================
// SIGUIENTE
// ==========================================

function siguientePregunta() {

  if (!respondida) {

    return;

  }

  preguntaActual++;

  if (preguntaActual < preguntas.length) {

    mostrarPregunta();

  } else {

    terminarJuego();

  }

}


// ==========================================
// TERMINAR
// ==========================================

function terminarJuego() {

  juego.classList.remove("activa");

  final.classList.add("activa");

  barraProgreso.style.width = "100%";

  resultadoPuntos.textContent =
    puntos;

  if (puntos === preguntas.length) {

    mensajeFinal.textContent =
      "RESULTADO PERFECTO. DOMINAS LA HISTORIA Y LOS GRANDES MOMENTOS DEL FÚTBOL.";

  } else if (puntos >= 25) {

    mensajeFinal.textContent =
      "EXCELENTE RESULTADO. TIENES CONOCIMIENTOS DE VERDADERO ESPECIALISTA.";

  } else if (puntos >= 18) {

    mensajeFinal.textContent =
      "MUY BUEN RESULTADO. CONOCES BASTANTE SOBRE EL DEPORTE REY.";

  } else if (puntos >= 10) {

    mensajeFinal.textContent =
      "BUEN INTENTO. ALGUNAS PREGUNTAS ERAN PARA VERDADEROS EXPERTOS.";

  } else {

    mensajeFinal.textContent =
      "EL NIVEL ERA DIFÍCIL. VUELVE A INTENTARLO Y SUPERA TU PUNTAJE.";

  }

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciarJuego() {

  final.classList.remove("activa");

  inicio.classList.add("activa");

  barraProgreso.style.width = "0%";

      }
