// Timer 
var timerEl = document.getElementById('time');
var mainEl = document.getElementById('.main');
var timeLeft = 100;

// Timer that counts down from 100
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      document.body.innerHTML = "You ran out of time";
    }
  }, 1000);
}

// Function to make quiz description dissapear when clicking on "start" button.
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


// // WORKING ON Function to make scoreboard appear at the end of the quiz. Hiding the "restart" button. 
// Start game function. Hiding the "start" button and shuffling the questions.
function scoreBoardAppear() {
  startButton.classList.add("hide")
  questionContainerElement.classList.add('hide')
}
  
//   // Stores user response (score) in variable
//   var usersScore = 


//   // Creates h2 element based on user's score.
//   var score = document.createElement("h2");
//   // Adds score text content to created tag
//   h2.textContent = "Your final score is  " + tagName + ".";
//   // Appends h2 as child of document body
//   document.body.appendChild(h2);
// }


// Variables
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

var shuffledQuestions, currentQuestionInde

// Starting the game when the "start" button is clicked.
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start game function. Hiding the "start" button and shuffling the questions.
function startGame() {
  startButton.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Function for bringing up the next question.
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Show current question and looping through answers.
function showQuestion(question) {
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

// Reset everything on our form back to it's default state everytime we set a new question.
function resetState() {
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


// Function for selecting the answer. 
function selectAnswer(e) {
  var selectedButton = e.target // Whatever is clicked on.
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else { // need to make this stop the timer, and bring up the scoreboard
    startButton.classList.remove("hide")
    startButton.innerText = 'View score'
    document.body.innerHTML = "Your score is";
  }

  // LOCAL STORAGE
  var count = localStorage.getItem("count");
  var counter = document.querySelector("#high-score");
  counter.textContent = count;
  correct.addEventListener("click", function(event) {
    event.preventDefault();
    if (count < 100) {
      count++;
      counter.textContent = count;
      localStorage.setItem("count", count);
    }
  });
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