// Variables
var timerEl = document.getElementById('time');
var mainEl = document.getElementById('.main');
var initialsEl = document.getElementById('initials');
var timeLeft = 100;
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var container = document.getElementById('container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var scoreboardElement = document.getElementById('score-board')
var timeKeeper = document.getElementById('score-board')
var reloadBtn = document.getElementById("reload");
var retakeBtn = document.getElementById("retake");
var shuffledQuestions, currentQuestionInde

// Timer that counts down from 100
function countdown() {
  // Use the setInterval() method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the timeLeft is greater than 1
    if (timeLeft > 1) {
      // Set the textContent of timerEl to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement timeLeft by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When timeLeft is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once timeLeft gets to 0, set timerEl to an empty string
      timerEl.textContent = '';
      startButton.classList.add("hide")
      nextButton.classList.add("hide")
      scoreboardElement.classList.remove("hide")
      scoreboardElement.textContent = "Your score is " + timeLeft;
      questionContainerElement.classList.add('hide')
      storeScores();
      // Use clearInterval() to stop the timer
      clearInterval(timeInterval);
      reloadBtn.classList.remove("hide")
    }
  }, 1000);
}

// Function to make quiz description dissapear when clicking on "start" button
function clickButton () {
  var x = document.getElementById("div1");
  countdown()
  if(x.style.display === "none") {
    x.style.display - "block";
  }
  else {
    x.style.display = "none";
  }
}

// Start game function. Hiding the "start" button and shuffling the questions
function scoreBoardAppear() {
  startButton.classList.add("hide")
  questionContainerElement.classList.add('hide')
  scoreboardElement.classList.add('hide')
}

// Starting the game when the "start" button is clicked
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start game function. Hiding the "start" button and shuffling the questions
function startGame() {
  startButton.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  container.classList.remove('hide')
  setNextQuestion()
}

// Function for bringing up the next question
function setNextQuestion() {
  clearState()
  visQuestion(shuffledQuestions[currentQuestionIndex])
}

// Show current question and looping through answers
function visQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Reset everything on our form back to it's default state everytime we set a new question
function clearState() {
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Function for selecting the answer
function selectAnswer(e) {
  // Whatever is clicked on
  var selectedButton = e.target 
  var correct = selectedButton.dataset.correct

setStatusClass(document.body, correct)
  if(!correct){
    timeLeft -= 10;
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else { 
    startButton.classList.add("hide")
    timerEl.classList.add("hide")
    scoreboardElement.classList.remove("hide")
    scoreboardElement.textContent = "All done! Your final score is " + timeLeft + ".";
    questionContainerElement.classList.add('hide')
    var initialsEl = document.getElementById('initials');
    initialsEl.classList.remove("hide")
    storeScores();
  }
}

// Local storage for timeLeft
function storeScores() {
  var remainingTime = timeLeft;
  localStorage.setItem("score", remainingTime)
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
}
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

// Local storage for user's score and initials 
var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); 

var userInitial = document.getElementById('initial-form');
var userInfo = {
  userScore: timeLeft,
  submittedUserInitial: userInitial.value.trim()
};

localStorage.setItem("submittedInitials", JSON.stringify(userInfo)); 

// Clear form on submit
userInitial.value = ""
});

// View previous score
var viewScore = document.getElementById("high-score");
viewScore.addEventListener("click", renderScore);

function renderScore() {
  var lastScore = JSON.parse(localStorage.getItem("submittedInitials"));
  console.log(lastScore)
  
  var container = document.getElementById('container')
  container.classList.add("hide")
  var title = document.getElementById('div1')
  title.classList.add("hide")
  timerEl.classList.add("hide")
  var previousScores = document.getElementById('previous-scores')
  previousScores.classList.remove("hide")
  var scoreContainer = document.getElementById('score-container')
  scoreContainer.classList.remove("hide")
  reloadBtn.classList.remove("hide")
  startButton.classList.add("hide")

  if (lastScore !== null) {
    document.querySelector(".message").textContent = lastScore.submittedUserInitial + " scored " + lastScore.userScore
  }
  
};

// Restart quiz button
// var reloadBtn = document.getElementById("reload");
// var retakeBtn = document.getElementById("retake");
reloadBtn.addEventListener("click", refresh);
retakeBtn.addEventListener("click", refresh);
function refresh() {
  location.reload();
}

// Quiz questions
var questions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false }
    ]
  },
  {
    question: "The condition in an if/else statement is enclosed with _____.",
    answers: [
      { text: "quotes", correct: false },
      { text: "curly brackets", correct: false },
      { text: "parenthesis", correct: true },
      { text: "square brackets", correct: false }
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    answers: [
      { text: "numbers and strings", correct: false },
      { text: "other arrays", correct: false },
      { text: "booleans", correct: false },
      { text: "all of the above", correct: true }
    ]
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answers: [
      { text: "commas", correct: false },
      { text: "curly brackets", correct: false },
      { text: "quotes", correct: false },
      { text: "parenthesis", correct: true }
    ]
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "terminal/bash", correct: false },
      { text: "for loops", correct: false },
      { text: "console.log", correct: true }
    ]
  }
]

