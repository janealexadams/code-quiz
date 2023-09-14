// Attach event listener to decrement button element
var startButton = document.querySelector("#start-quiz-button");
var timeEl = document.querySelector(".time");
var secondsLeft = 100;

startButton.addEventListener("click", function() {
    setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";
}, 1000);
});


	
