/*
GAME FUNCTION:
-player must guess a number between a min and max
-players gets a certain amount of guesses
-notify player of guesses remaining
-notify the player of the correct answer if loose
-let player choose to play again
*/

//game values
let min = 1,
    max = 25,
    winningNum = getRandomNum(min, max) //Math.floor(Math.random()*100 + 1);      
    guessesLeft = 5;
   
// UI Elements
const UIgame = document.querySelector('#game');
      UIminNum = document.querySelector('.min-num');
      UImaxNum = document.querySelector('.max-num');
      UIguess = document.querySelector('#guess-input');
      UIsubmitBtn = document.querySelector('#guess-value');
      UImessage = document.querySelector('.message');

//assign UI MIN AND MAX

UIminNum.textContent = min;
UImaxNum.textContent = max;
      
//play again event listener
UIgame.addEventListener('mousedown',function (e) {
   if (e.target.className === "play-again") {
    window.location.reload()
   } 
})
// Listen for guess
UIsubmitBtn.addEventListener('click', function(){
  let guess = parseInt(UIguess.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){
    //Game over - won
   gameOver(true, `${winningNum} is correct ✅, YOU WIN !!! 🥳`)
  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
        //Game Over-lost
        gameOver(false, `Game Over😢, YOU LOSE !!!😖. The correct number was ${winningNum}`);
    }else{
        //Game continues-answer wrong

        //change border color
        UIguess.style.borderColor = "red";
        

        //clear Input
        UIguess.value = '';

        // Tell User its the wrong number
        setMessage(`${guess} is not correct ❌, ${guessesLeft} guesses left`);
        
    }
  }
});

//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = "green" : color = "red";
    UIguess.disabled = true;
    // CHANGE BOARDER COLOR
    UIguess.style.borderColor = "green";
    // change text color
    UIguess.style.color = color;
    // change message color
    UImessage.style.color = color;
    //set message
    setMessage(msg);


    // play again?
    UIsubmitBtn.value = "Play Again 🤩 ";
    UIsubmitBtn.className += "play-again";
}
    // get winning Number
    function getRandomNum(min, max) {
        return Math.floor(Math.random()*(max-min + 1)+ min);
    }
// Set message
function setMessage(msg, color){
  UImessage.style.color = color;
  UImessage.textContent = msg;
}




 
    