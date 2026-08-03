const categoryScreen = document.getElementById("category-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const categoryButtons = document.querySelectorAll(".category-button");

const scoreElement = document.getElementById("score");
const categoryName = document.getElementById("category-name");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const playAgainButton = document.getElementById("play-again-button");


const categories = {

  videojuegos: {
    name: "VIDEOJUEGOS",

    questions: [

      {
        question: "¿Cuál es el personaje principal de Minecraft?",
        answers: [
          "Steve",
          "Mario",
          "Sonic",
          "Link"
        ],
        correct: 0
      },

      {
        question: "¿Qué juego tiene un mapa llamado Battle Royale?",
        answers: [
          "Minecraft",
          "Fortnite",
          "Among Us",
          "Roblox"
        ],
        correct: 1
      },

      {
        question: "¿Qué empresa creó la consola PlayStation?",
        answers: [
          "Nintendo",
          "Microsoft",
          "Sony",
          "Sega"
        ],
        correct: 2
      },

      {
        question: "¿En qué juego aparece Mario?",
        answers: [
          "Super Mario Bros.",
          "Minecraft",
          "Free Fire",
          "FIFA"
        ],
        correct: 0
      },

      {
        question: "¿Qué juego permite construir con bloques?",
        answers: [
          "Minecraft",
          "Pac-Man",
          "Tetris",
          "Sonic"
        ],
        correct: 0
      },

      {
        question: "¿Cuál es el nombre del erizo azul?",
        answers: [
          "Crash",
          "Sonic",
          "Tails",
          "Knuckles"
        ],
        correct: 1
      },

      {
        question: "¿Qué empresa creó Xbox?",
        answers: [
          "Apple",
          "Microsoft",
          "Sony",
          "Nintendo"
        ],
        correct: 1
      },

      {
        question: "¿Qué juego tiene personajes llamados creepers?",
        answers: [
          "Roblox",
          "Fortnite",
          "Minecraft",
          "Terraria"
        ],
        correct: 2
      },

      {
        question: "¿Cuál es el objetivo principal de un juego de carreras?",
        answers: [
          "Construir una casa",
          "Llegar primero a la meta",
          "Resolver preguntas",
          "Encontrar letras"
        ],
        correct: 1
      },

      {
        question: "¿Qué videojuego tiene un personaje llamado Pikachu?",
        answers: [
          "Pokémon",
          "Sonic",
          "Mario Kart",
          "Minecraft"
        ],
        correct: 0
      }

    ]
  },


  futbol: {
    name: "FÚTBOL",

    questions: [

      {
        question: "¿Cuántos jugadores tiene un equipo en el campo?",
        answers: [
          "9",
          "10",
          "11",
          "12"
        ],
        correct: 2
      },

      {
        question: "¿Cuánto dura normalmente un partido de fútbol?",
        answers: [
          "60 minutos",
          "80 minutos",
          "90 minutos",
          "100 minutos"
        ],
        correct: 2
      },

      {
        question: "¿Qué país ganó el Mundial de 2022?",
        answers: [
          "Francia",
          "Argentina",
          "Brasil",
          "España"
        ],
        correct: 1
      },

      {
        question: "¿Cómo se llama la máxima competición de selecciones?",
        answers: [
          "Champions League",
          "Copa Mundial",
          "Copa Libertadores",
          "Premier League"
        ],
        correct: 1
      },

      {
        question: "¿Cuántos puntos vale una victoria normalmente?",
        answers: [
          "1",
          "2",
          "3",
          "4"
        ],
        correct: 2
      },

      {
        question: "¿Qué jugador es conocido como CR7?",
        answers: [
          "Lionel Messi",
          "Cristiano Ronaldo",
          "Neymar",
          "Kylian Mbappé"
        ],
        correct: 1
      },

      {
        question: "¿Qué tarjeta expulsa a un jugador?",
        answers: [
          "Azul",
          "Verde",
          "Amarilla",
          "Roja"
        ],
        correct: 3
      },

      {
        question: "¿Cómo se llama el jugador que protege la portería?",
        answers: [
          "Delantero",
          "Arquero",
          "Defensa",
          "Mediocampista"
        ],
        correct: 1
      },

      {
        question: "¿Qué país es conocido por la selección Canarinha?",
        answers: [
          "Brasil",
          "Colombia",
          "Portugal",
          "Italia"
        ],
        correct: 0
      },

      {
        question: "
