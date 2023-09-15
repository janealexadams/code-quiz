// Making variable for the start button.
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// These are both undefined
let shuffledQuestions, currentQuestionIndex

// eventLisener for the start button.
startButton.addEventListener("click", startGame);

// Function for starting the game. 
function startGame() {
  console.log("Started");
  // This is hiding the start button when we click Start
  startButton.classList.add("hide"); 
  // Will shuffle our questions
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  // This is making the answer container appear
  questionContainerElement.classList.remove("hide");
  // This is making the question appear
  setNextQuestion()
}

// Funciton for setting the next question.
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild);
    answerButtonsElement.removeChild(answerButtonsElement.firstElementChild);
}



// Function for when an answer is selected
function selectAnswer() {
}

const questions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      {text: "strings", correct: false },
      {text: "booleans", correct: false},
      {text: "alerts", correct: true},
      {text: "numbers", correct: false}
    ]
  }
]