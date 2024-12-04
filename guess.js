// ---GUESSING GAME---

let form = document.querySelector('#guessForm');
let guessField = document.querySelector('#guessField');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;

let previousGuesses = document.querySelector('#previous');

form.addEventListener('submit', e => {
    e.preventDefault();
    let userGuess = Number(guessField.value);
    let result = document.querySelector('#result');
    
    result.classList.remove('justRight', 'tooBig', 'tooSmall', 'tooMany');
    guessCount += 1;
    if(userGuess === randomNumber){
        result.textContent = 'Congratulations! You guessed correctly!';
        result.setAttribute('class', 'justRight');
        gameOver();
    } else {
        if(guessCount < 10){
            if(guessCount == 1){
            previousGuesses.textContent = 'Previous guesses: ' + userGuess;
            } else {
            previousGuesses.textContent += ' ' + userGuess;
            }
            if(userGuess > randomNumber){
                result.textContent = 'Nope. That number is too HIGH';
                result.setAttribute('class', 'tooBig');
            } else if(userGuess < randomNumber){
                result.textContent = 'Nope. That number is too LOW';
                result.setAttribute('class', 'tooSmall');
            }
        } else {
            result.textContent = 'Too many guesses!';
            result.setAttribute('class', 'tooMany');
            gameOver();
        }
        guessField.value = null;
    }
});

const gameOver = () => {
    guessField.disabled = true;

    resetButton = document.createElement('button');
    resetButton.style.fontSize = 'x-large';
    resetButton.textContent = 'Start New Game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    resetButton.focus();
}


function resetGame(){
    resetButton.parentNode.removeChild(resetButton);
    guessCount = 0;
    previousGuesses.textContent = null;
    result.textContent = null;
    result.classList.remove('justRight', 'tooMany');
    guessField.disabled = false;
    guessField.value = null;
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
}