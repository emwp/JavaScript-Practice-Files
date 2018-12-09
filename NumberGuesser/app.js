// Game Values
let min = 1,
    max = 10,
    winNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign Min/Max UI Value
minNum.textContent = min;
maxNum.textContent = max;

// play again event listner
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Event listner button

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  

// Validation
if (isNaN(guess) || guess < min || guess > max) {
  setMessage(`Please enter a number between ${min} and ${max}`, 'red');
}  
// Check if won
if (guess === winNum) {
  // Game Over - WON
  gameOver(true, `${winNum} is correct. YOU WON!`);

} else {
  guessesLeft -= 1;
  if (guessesLeft === 0) {
    //guessBtn.disabled = true;
    gameOver(false, `Game over. You lost! The correct number was ${winNum}.`);

  } else {
    // Game Continues
    //Change the border color
    guessInput.style.borderColor = 'red'; 
    guessInput.value = '';
    setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left. `, 'red')

  }
}
});


// Error Message

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver (won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable Input
  guessInput.disabled = true;
  //Change the border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set Message
  setMessage(msg)

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}