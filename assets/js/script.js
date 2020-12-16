// Element selectors
const highscores = document.getElementById("highscores");
const question = document.querySelector(".question");
const optionsList = document.querySelector(".listOfOptions");
const container = document.querySelector(".container");
const submitForm = document.getElementById("form-body");
const finishedHeader = document.getElementById("finishedHeader");
const submitScoreBtn = document.querySelector(".submitScore");
const initials = document.getElementById("initials");
let seconds = document.getElementById("countdown").textContent;

// Setting initial values
let currentQuestion = {};
let questionCounter = 0;

// Object containing quiz questions and answers
const quizQuestions = [
  {
    question: "JavaScript is a ___ -side programming language.",
    answers: ["Client & Server", "Client", "Right", "Server"],
    correctAnswer: "Client & Server",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: ["Node.js", "TypeScript", "Moment.js", "npm"],
    correctAnswer: "npm",
  },
  {
    question:
      "Which of the following will write the message “Hello World!” in an alert box?",
    answers: [
      "alertBox(“Hello World!”)",
      "alert(“Hello World!”)",
      "msgAlert(“Hello World!”)",
      "prompt(Hello World)",
    ],
    correctAnswer: "alert(“Hello World!”)",
  },
  {
    question: "Which of the following is an EventListener in Javascript?",
    answers: ["onClick", "focus", "click", "prompt"],
    correctAnswer: "click",
  },
  {
    question: "What is the correct syntax of a 'for' statement in JavaScript?",
    answers: [
      "for(initialization; condition; increment)",
      "for(condition; initialization; increment)",
      "for(initialization, increment, condition)",
      "for(increment; condition; initialization)",
    ],
    correctAnswer: "for(initialization; condition; increment)",
  },
];

// Using setInterval to start the timer/score countdown
let countdown = setInterval(function () {
  seconds--;
  document.getElementById("countdown").textContent = seconds;
  // Ends the quiz, stops timer, and diplays submit form if timer expires or all questions have been answered
  if (seconds <= 0 || questionCounter > quizQuestions.length) {
    displayForm();
    clearInterval(countdown);
  }
}, 1000);

// Function that kicks off the quiz, hiding the submitForm
function startQuiz() {
  submitForm.style.display = "none";
  questionCounter = 0;
  getNewQuestion();
}

// Function that retieves a new question once an answer is clicked
function getNewQuestion() {
  if (questionCounter >= quizQuestions.length) {
    displayForm();
    return;
  }
  // Using array index of quizQuestions to determine question to display
  currentQuestion = quizQuestions[questionCounter];
  question.textContent = currentQuestion.question;
  getOptions();
  questionCounter++;
}

// Function to get answer options for question
function getOptions() {
  currentQuestion = quizQuestions[questionCounter];
  // Dynamically creating a button for each answer option
  currentQuestion.answers.forEach((answer) => {
    let listElement = document.createElement("li");
    let option = document.createElement("button");
    option.textContent = answer;
    option.setAttribute("value", answer);
    optionsList.append(listElement);
    listElement.append(option);

    // Event listener for answer option buttons
    option.addEventListener("click", function (e) {
      let selectedAnswer = e.target.value;
      let checkAnswer = document.createElement("div");
      checkAnswer.classList.add("checkAnswer");
      // If selected answer is correct, display CORRECT!
      if (selectedAnswer === currentQuestion.correctAnswer) {
        checkAnswer.textContent = "CORRECT!";
        container.append(checkAnswer);
      }
      // If selected answer is wrong, display INCORRECT! and subtract 10 seconds from timer/score
      if (selectedAnswer !== currentQuestion.correctAnswer) {
        checkAnswer.textContent = "INCORRECT!";
        container.append(checkAnswer);
        seconds = seconds - 10;
      }

      // Removes correct/incorrect answer text and loads a new question after 1 second
      setTimeout(() => {
        optionsList.innerHTML = "";
        checkAnswer.textContent = "";
        getNewQuestion();
      }, 1000);
    });
  });
}

// Function to stop the timer/score, hide quiz questions, and display form to submit score
function displayForm() {
  clearInterval(countdown);
  document.getElementById("quiz-div").style.display = "none";
  submitForm.style.display = "block";
  let finalScoreText = document.createElement("li");
  finalScoreText.textContent = `Your final score is: ${seconds}`;
  finishedHeader.append(finalScoreText);
  addLocalStorage();
}

// Function to add initials and score to localStorage
function addLocalStorage() {
  submitScoreBtn.addEventListener("click", function () {
    // Validation to make sure user enters initals between 1-3 characters
    if (initials.value === "" || initials.value.length > 3) {
      alert(
        "Please enter your initials using 3 letters or less to submit your score"
      );
      return;
    }
    const scoresArr = JSON.parse(localStorage.getItem("scores")) || [];
    scoresArr.push({
      score: seconds,
      initials: initials.value,
    });
    localStorage.setItem("scores", JSON.stringify(scoresArr));
    window.location.assign("highscores.html");
  });
}

startQuiz();
