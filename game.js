const preguntas = [
  {
    pregunta: "¿Qué selección ha ganado más Copas del Mundo?",
    opciones: ["Alemania", "Argentina", "Brasil", "Italia"],
    correcta: 2
  },
  {
    pregunta: "¿Qué selección ganó el Mundial de 2022?",
    opciones: ["Francia", "Argentina", "Croacia", "Brasil"],
    correcta: 1
  },
  {
    pregunta: "¿Quién es conocido como 'La Pulga'?",
    opciones: ["Cristiano Ronaldo", "Neymar", "Lionel Messi", "Kylian Mbappé"],
    correcta: 2
  },
  {
    pregunta: "¿Qué club ha ganado más Champions League?",
    opciones: ["Barcelona", "Real Madrid", "Milan", "Bayern Múnich"],
    correcta: 1
  },
  {
    pregunta: "¿De qué país es Cristiano Ronaldo?",
    opciones: ["España", "Brasil", "Portugal", "Italia"],
    correcta: 2
  },
  {
    pregunta: "¿Qué selección es conocida como 'La Canarinha'?",
    opciones: ["Argentina", "Brasil", "Colombia", "Portugal"],
    correcta: 1
  },
  {
    pregunta: "¿Qué jugador tiene más Balones de Oro?",
    opciones: ["Cristiano Ronaldo", "Lionel Messi", "Michel Platini", "Johan Cruyff"],
    correcta: 1
  },
  {
    pregunta: "¿Qué país ganó el Mundial de 2018?",
    opciones: ["Croacia", "Francia", "Alemania", "Argentina"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es el apodo de la selección colombiana?",
    opciones: ["La Albiceleste", "La Tricolor", "La Roja", "La Canarinha"],
    correcta: 1
  },
  {
    pregunta: "¿Cuántos jugadores tiene un equipo en el campo?",
    opciones: ["9", "10", "11", "12"],
    correcta: 2
  }
];

let preguntaActual = 0;
let puntos = 0;


/* ELEMENTOS DEL HTML */

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");

const botonIniciar = document.getElementById("boton-iniciar");
const botonSiguiente = document.getElementById("boton-siguiente");
const botonReiniciar = document.getElementById("boton-reiniciar");

const contador = document.getElementById("contador");
const puntosTexto = document.getElementById("puntos");

const barraProgreso = document.getElementById("barra-progreso");

const preguntaTexto = document.getElementById("pregunta");
const opcionesContenedor = document.getElementById("opciones");

const mensaje = document.getElementById("mensaje");

const resultado = document.getElementById("resultado");
const mensajeFinal = document.getElementById("mensaje-final");


/* INICIAR EL JUEGO */

botonIniciar.addEventListener("click", iniciarJuego);

function iniciarJuego() {

  preguntaActual = 0;
  puntos = 0;

  pantallaInicio.classList.remove("activa");
  pantallaFinal.classList.remove("activa");

  pantallaJuego.classList.add("activa");

  mostrarPregunta();

}


/* MOSTRAR LA PREGUNTA */

function mostrarPregunta() {

  const pregunta = preguntas[preguntaActual];

  contador.textContent =
    `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

  puntosTexto.textContent =
    `Puntos: ${puntos}`;

  preguntaTexto.textContent =
    pregunta.pregunta;

  opcionesContenedor.innerHTML = "";

  mensaje.textContent = "";

  mensaje.className = "";

  botonSiguiente.disabled = true;


  /* ACTUALIZAR BARRA */

  const progreso =
    (preguntaActual / preguntas.length) * 100;

  barraProgreso.style.width =
    `${progreso}%`;


  /* CREAR LAS RESPUESTAS */

  pregunta.opciones.forEach((opcion, indice) => {

    const boton = document.createElement("button");

    boton.textContent = opcion;

    boton.classList.add("opcion");

    boton.addEventListener(
      "click",
      () => revisarRespuesta(indice)
    );

    opcionesContenedor.appendChild(boton);

  });

}


/* REVISAR RESPUESTA */

function revisarRespuesta(indiceElegido) {

  const pregunta = preguntas[preguntaActual];

  const botones =
    document.querySelectorAll(".opcion");


  /* DESACTIVAR LAS OPCIONES */

  botones.forEach((boton) => {

    boton.disabled = true;

  });


  /* RESPUESTA CORRECTA */

  if (indiceElegido === pregunta.correcta) {

    puntos++;

    mensaje.textContent =
      "¡Correcto! ⚽";

    mensaje.classList.add(
      "mensaje-correcto"
    );

  } else {

    mensaje.textContent =
      `Incorrecto. La respuesta era: ${pregunta.opciones[pregunta.correcta]}`;

    mensaje.classList.add(
      "mensaje-incorrecto"
    );

  }


  /* MOSTRAR LA CORRECTA */

  botones.forEach((boton, indice) => {

    if (indice === pregunta.correcta) {

      boton.classList.add(
        "correcta"
      );

    }

    if (
      indice === indiceElegido &&
      indice !== pregunta.correcta
    ) {

      boton.classList.add(
        "incorrecta"
      );

    }

  });


  puntosTexto.textContent =
    `Puntos: ${puntos}`;

  botonSiguiente.disabled = false;

}


/* SIGUIENTE PREGUNTA */

botonSiguiente.addEventListener(
  "click",
  siguientePregunta
);

function siguientePregunta() {

  preguntaActual++;

  if (
    preguntaActual < preguntas.length
  ) {

    mostrarPregunta();

  } else {

    terminarJuego();

  }

}


/* TERMINAR EL JUEGO */

function terminarJuego() {

  pantallaJuego.classList.remove(
    "activa"
  );

  pantallaFinal.classList.add(
    "activa"
  );


  /* COMPLETAR LA BARRA */

  barraProgreso.style.width =
    "100%";


  resultado.textContent =
    `Obtuviste ${puntos} de ${preguntas.length} puntos`;


  /* MENSAJE SEGÚN EL RESULTADO */

  if (puntos === preguntas.length) {

    mensajeFinal.textContent =
      "¡Perfecto! Eres un verdadero experto del fútbol. 🏆";

  } else if (puntos >= 7) {

    mensajeFinal.textContent =
      "¡Muy bien! Tienes grandes conocimientos de fútbol. ⚽";

  } else if (puntos >= 4) {

    mensajeFinal.textContent =
      "Buen intento. Sigue aprendiendo y vuelve a jugar. 👏";

  } else {

    mensajeFinal.textContent =
      "Puedes mejorar. ¡Inténtalo otra vez! ⚽";

  }

}


/* JUGAR OTRA VEZ */

botonReiniciar.addEventListener(
  "click",
  volverAlInicio
);

function volverAlInicio() {

  pantallaFinal.classList.remove(
    "activa"
  );

  pantallaInicio.classList.add(
    "activa"
  );

  barraProgreso.style.width =
    "0%";

}
