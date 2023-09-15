// Making variable for the start button.
const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");

// eventLisener for the start button.
startButton.addEventListener("click", startGame);

// Function for starting the game. 
function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
}

// Funciton for setting the next question.
function setNextQuestion() {

}

// Function for when an answer is selected
function selectAnswer() {

}