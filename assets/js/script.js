var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var startButton = document.querySelector(".start-button");
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var message = 'Time is up!';


var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

const options = {
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

function setWord() {
  var randomWord= words[Math.floor(Math.random() * words.length)];
  lettersInChosenWord = randomWord.split('');
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];

  for (var i = 0; numBlanks; i++) {
    blanksLetters.push('_');
  }
  wordBlank.textContent = blanksLetters.join('');

}

function init() {
  getWins();
  getlosses();
}

function getWins() {
  var wins = localStorage.getItem('winCount');
   if(wins === null) {
    setWord();
   }
}

function startGame() {
  isWin = false; 
  startButton.disabled = true;
  renderBlanks();
  setWord();
  countdown();
}

function userGuess() {
  document.addEventListener("keydown", keydownAction);
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft == 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      timeIsUpMessage();
    }
  }, 1000);
}

function countdown() {
  var timeLeft = 90;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft == 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      timeIsUpMessage();
    }
  }, 1000);
}

function timeIsUpMessage() {
  mainEl.textContent = message;
}

function answerWasCorrect() {
  if (answer === false) {
    displayMessage("Wrong","your answer was incorrect");
  } else if (answer === "") {
    displayMessage("Hmmm", "You need to select an answer");
  } else {
    displayMessage("Correct!", "you answered successfully");
  }
}


