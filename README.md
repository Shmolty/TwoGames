# TwoGames Website!
## About
This project is a website that I created using HTML, CSS, and Javascript. It is a page with Two Games that you can choose from to play. 
The site is set up so that only one game will display on the web-page at a time, and you can switch to the other via tabs at the top.

You can view and interact with the site [right here!](https://shmolty.github.io/TwoGames/)

This was accomplished by creating functions to toggle the ".content" sections 'active' state, and highlight the selected tab.
``` js
toggleTabs(e) {
        // remove current active classes
        this.tabs.forEach(tab => tab.classList.remove('active'));
        // add new active class to clicked tab
        e.target.classList.add('active');
    }
    toggleContent(e) {
        // remove current active classes
        this.container.querySelectorAll('.content').forEach(item => {
            item.classList.remove('active');
        });
        // add new active class to content
        const selector = e.target.getAttribute('data-target');
        const content = this.container.querySelector(selector);
        content.classList.add('active');

    }
```
When the user clicks a certain tab, the corresponding
content becomes active, and the other tabs content is toggled off. This is done using a click event listener for the tabs, a function for hiding and 
activating content, and a function for highlighting the selected tab. All of this is wrapped up inside a created Class and initialized inside if index.js.
``` js
const tabs = new Tabs(document.querySelector('.tabs'));
tabs.init();
```

## First game
The first game is a simple coin toss (heads or tails).
The user chooses a guess, which is tracked in a click event listener. On click, the choice is stored, the coin is flipped and an outcome is grabbed from an
array `['heads', 'tails']`. The coin toss is then displayed by switching an image to the corresponding side, displaying a message, and then adding to a counter
of correct/incorrect guesses. 
``` js
 // output to DOM
    coinImage.src = imgResult;
    tossResult.innerHTML = `
<p>You chose ${e.target.value.toUpperCase()}</p>
<p>The toss is ${result.toUpperCase()}</p>`;
    // check for matching choice, update DOM and score variables
    if(result === choice){
        wins++;
        tossResult.innerHTML += `<p>You chose wisely!</p>`;
    } else {
        losses++;
        tossResult.innerHTML += `<p>Sorry, wrong choice</p>`;
    }
    // create score array, output score to DOM
    let score = [wins, losses];
    winLoss.textContent = `Wins = ${score[0]} Losses = ${score[1]}`;

});
```

## Second Game
The second game is a number guessing game.
The user must guess a number between 1 and 100, and is given 10 tries to do it. `if(guessCount < 10)` 
A random number is generated on start that will be compared to each guess. `let randomNumber = Math.floor(Math.random() * 100) + 1;` 
A submit event listener was created with conditional checks to evaluate the number guessed vs the random number created. The amount of 
tries is also tracked inside of this event listener, and a gameOver function is called when the player guesses correctly, or too many times.
``` js
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
```
After the game is finished, there is a reset button that the player can click to refresh all of the fields and try again with a new random number.
``` js
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
```
