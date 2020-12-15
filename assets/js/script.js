// Element selectors
const startQuizBtn = document.querySelector(".startQuiz")
const highscores = document.getElementById('highscores');
const question = document.querySelector('.question');
const optionsList = document.querySelector('.listOfOptions');
const container = document.querySelector('.container');


// Setting initial values 
let currentQuestion = {};
let questionCounter = 0;
let scores = [];

// Object containing quiz questions and answers
const quizQuestions = [
  {
    question: "JavaScript is a ___ -side programming language.",
    answers: [ "Client & Server", "Client", "Right", "Server"],
    correctAnswer: "Client & Server",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: [ "Node.js", "TypeScript", "Moment.js", "npm"],
    correctAnswer: "npm",
  },
  {
    question:
      "Which of the following will write the message “Hello World!” in an alert box?",
    answers: [ "alertBox(“Hello World!”)", "alert(“Hello World!”)", "msgAlert(“Hello World!”)", "prompt(Hello World)"],
    correctAnswer: "alert(“Hello World!”)",
  },
  {
    question: "Which of the following is an EventListener in Javascript?",
    answers: [ "onClick", "focus", "click", "prompt"],
    correctAnswer: "click",
  },
  {
    question: "What is the correct syntax of a 'for' statement in JavaScript?",
    answers: ["for(initialization; condition; increment)", "for(condition; initialization; increment)", "for(initialization, increment, condition)","for(increment; condition; initialization)"],
    correctAnswer: "for(initialization; condition; increment)",
  },
];