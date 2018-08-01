const guessInput = document.getElementById('guessedNumber'),
      game = document.getElementById('game'),
      guessBtn = document.getElementById('guessBtn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      message = document.querySelector('.message');

let min = 1,
    max = 10,
    winNumber = Math.floor(Math.random()*(max-min)+min),
    guessesLeft = 3;

minNum.textContent = min;
maxNum.textContent = max;


guessBtn.addEventListener('click',guessNumber);
game.addEventListener('mousedown',(e)=>{
    if(e.target.classList.contains('play-again')){
        location.reload();
    }
})

function guessNumber(e){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max ){
        showMessage(`please enter number between ${min} and ${max}`,'red');
    }else{
        if(guess === winNumber){
            gameOver(true,`Congratulations! You guessed right :) Truth is: ${guess}`);
        }else{
            guessesLeft--;
            if(guessesLeft === 0){
                gameOver(false,`You lost :( Number was: ${winNumber}.`);
            }else{
                guessInput.value = '';
                showMessage(`${guess} is not right a right number. You have ${guessesLeft} guesses left`,'red');
            }
        } 
    }
    
    e.preventDefault();
}

function showMessage(msg,color){
    message.style.color = color;
    message.innerHTML = msg;
}

function gameOver(won,msg){
    let color;
    won == true ? color = 'green' : color = 'red';

    message.style.color = color;
    guessInput.style.borderColor = color;
    guessInput.disabled = true;

    showMessage(msg);

    //play again button
    guessBtn.value = 'PLay Again?';
    guessBtn.className += 'play-again';

}