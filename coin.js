// --- COIN TOSS GAME ---
// handles
const coinImage = document.querySelector('.coinImg');
const coinForm = document.querySelector('.coinToss');
const tossResult = document.querySelector('.tossResult');
const winLoss = document.querySelector('.winLoss');

// declarations for wins and losses
let wins = 0;
let losses = 0;

// event listener on the form
coinForm.addEventListener('click', e => {
    // prevent default
    e.preventDefault();
    
    // declarations for which button is clicked, coinflip outcomes, and images
    let choice = e.target.value;
    let coinFlips = ['heads', 'tails'];
    let coinImages = ['images/heads.jpg', 'images/tails.jpg'];
    // coint toss
    let toss = Math.round(Math.random());
    // output variables
    let result = coinFlips[toss];
    let imgResult = coinImages[toss];
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