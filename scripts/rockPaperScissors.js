/*
notes for javascript object, JSON and localStorage
- localStorage only support string!
- JSON is similar to javascript object, less feature but more universal
- JSON must use double quotes and it doesn't support functions in an object
- even we use const to define an object, we can still change the value in the object by reference
- when comparing objects, we actually compare the references instead of the values                
*/

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

function reset () {
    score.wins = 0; 
    score.losses = 0; 
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();

}
// second way
document.querySelector('.js-rock').addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-paper').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-scissors').addEventListener('click', () => {
    playGame('scissors');
});

// if the user wants to use keyboard to play
document.body.addEventListener('keydown', (event) => { // use event to get the key we pressed
    if(event.key === 'r') {
        playGame('rock');
    }else if(event.key === 'p') {
        playGame('paper');
    }else if(event.key === 's') {
        playGame('scissors');
    }
});

function playGame(player) {
    const computer = pickComputer();
    let result = '';
    
    if (player === 'rock') {
        if (computer === 'rock') {
            result = 'Tie.';
        }else if (computer === 'paper') {
            result = 'You Lose.';
        }else if (computer === 'scissors') {
            result = 'You Win.';
        }

    }else if (player === 'paper') {
        if (computer === 'rock') {
            result = 'You Win.';
        }else if (computer === 'paper') {
            result = 'Tie.';
        }else if (computer === 'scissors') {
            result = 'You Lose.';
        }

    }else if (player === 'scissors') {
        if (computer === 'rock') {
            result = 'You Lose.';
        }else if (computer === 'paper') {
            result = 'You Win.';
        }else if (computer === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You Win.') {
        score.wins += 1;
    }else if (result === 'You Lose.') {
        score.losses += 1;
    }else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-choice').innerHTML = 
        `You<img src="../images/${player}-emoji.png" class="icon">
        <img src="../images/${computer}-emoji.png" class="icon">Computer`;
    updateScore();
}

function updateScore () {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;                
}

function pickComputer() {
    const num = Math.random();
    let computer = '';
    if (num >= 0 && num < 1/3) {
        computer = 'rock';
    }else if (num >= 1/3 && num < 2/3) {
        computer = 'paper';
    }else if (num >= 2/3 && num < 1) {
        computer = 'scissors';
    }
    return computer;
}

let isAutoPlay = false;
let id;
function autoPlay() {
    if(!isAutoPlay) {
        // the first parameter is the function we want to execute in the future
        // the second parameter is the waiting time in milliseconds            
        // interval returns an unique id each time
        
        // this function will run in the background, 
        // if we want to stop it, simply click the Auto Play button again to check the value of isAutoPlay
        id = setInterval(function() {
            const player = pickComputer();
            playGame(player);
        }, 1000);
        isAutoPlay = true;
    }else {
        // clear the interval
        clearInterval(id);
        isAutoPlay = false;
    }    
}