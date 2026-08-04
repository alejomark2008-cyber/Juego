// ==========================================
// TRIVIA DE FÚTBOL
// ==========================================

// PREGUNTAS

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
// COMENZAR EL JUEGO
// ==========================================

function comenzarJuego() {

  preguntaActual = 0;

  puntos = 0;

  respondida = false;


  // Ocultar la portada

  inicio.classList.remove("activa");


  // Ocultar el resultado

  final.classList.remove("activa");


  // Mostrar el juego

  juego.classList.add("activa");


  // Mostrar la primera pregunta

  mostrarPregunta();

}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

  const datos = preguntas[preguntaActual];


  // Reiniciar respuesta

  respondida = false;


  // Mostrar contador

  contador.textContent =
    `PREGUNTA ${preguntaActual + 1} DE ${preguntas.length}`;


  // Mostrar puntos

  puntosTexto.textContent =
    `${puntos} PUNTOS`;


  // Mostrar número grande

  numeroPregunta.textContent =
    String(preguntaActual + 1).padStart(2, "0");


  // Mostrar pregunta

  preguntaTexto.textContent =
    datos.pregunta;


  // Borrar respuestas anteriores

  opciones.innerHTML = "";


  // Borrar mensaje

  mensaje.textContent = "";

  mensaje.className = "";


  // Desactivar siguiente

  btnSiguiente.disabled = true;


  // Cambiar el texto del botón

  if (preguntaActual === preguntas.length - 1) {

    btnSiguiente.innerHTML =
      "VER RESULTADO <span>→</span>";

  } else {

    btnSiguiente.innerHTML =
      "SIGUIENTE <span>→</span>";

  }


  // Actualizar la barra

  const progreso =
    (preguntaActual / preguntas.length) * 100;


  barraProgreso.style.width =
    `${progreso}%`;


  // Crear las respuestas

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

  // Evitar responder dos veces

  if (respondida) {

    return;

  }


  respondida = true;


  const datos =
    preguntas[preguntaActual];


  const botones =
    document.querySelectorAll(".opcion");


  // Desactivar todas las respuestas

  botones.forEach(function(boton) {

    boton.disabled = true;

  });


  // Revisar si es correcta

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


  // Pintar las respuestas

  botones.forEach(function(boton, indice) {

    // Mostrar la correcta

    if (indice === datos.correcta) {

      boton.classList.add("correcta");

    }


    // Mostrar la incorrecta elegida

    if (
      indice === respuestaElegida &&
      indice !== datos.correcta
    ) {

      boton.classList.add("incorrecta");

    }

  });


  // Actualizar los puntos

  puntosTexto.textContent =
    `${puntos} PUNTOS`;


  // Activar siguiente

  btnSiguiente.disabled = false;

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

  // No permitir avanzar sin responder

  if (!respondida) {

    return;

  }


  preguntaActual++;


  // Revisar si quedan preguntas

  if (preguntaActual < preguntas.length) {

    mostrarPregunta();

  } else {

    terminarJuego();

  }

}


// ==========================================
// TERMINAR EL JUEGO
// ==========================================

function terminarJuego() {

  // Ocultar preguntas

  juego.classList.remove("activa");


  // Mostrar resultado

  final.classList.add("activa");


  // Completar la barra

  barraProgreso.style.width = "100%";


  // Mostrar puntaje

  resultadoPuntos.textContent =
    puntos;


  // Mensaje según el puntaje

  if (puntos === preguntas.length) {

    mensajeFinal.textContent =
      "RESULTADO PERFECTO. DOMINAS LA HISTORIA Y LOS GRANDES MOMENTOS DEL FÚTBOL.";

  } else if (puntos >= 10) {

    mensajeFinal.textContent =
      "EXCELENTE RESULTADO. TIENES CONOCIMIENTOS DE VERDADERO ESPECIALISTA.";

  } else if (puntos >= 7) {

    mensajeFinal.textContent =
      "MUY BUEN RESULTADO. CONOCES BASTANTE SOBRE EL DEPORTE REY.";

  } else if (puntos >= 4) {

    mensajeFinal.textContent =
      "BUEN INTENTO. ALGUNAS PREGUNTAS ERAN PARA VERDADEROS EXPERTOS.";

  } else {

    mensajeFinal.textContent =
      "EL NIVEL ERA DIFÍCIL. VUELVE A INTENTARLO Y SUPERA TU PUNTAJE.";

  }

}


// ==========================================
// JUGAR OTRA VEZ
// ==========================================

function reiniciarJuego() {

  // Ocultar resultado

  final.classList.remove("activa");


  // Mostrar portada

  inicio.classList.add("activa");


  // Reiniciar la barra

  barraProgreso.style.width = "0%";

}
