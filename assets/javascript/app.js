//Variables to keep track of score
var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

//Hide dice on game load
document.querySelector('.dice').style.display = 'none';

//set defaults to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display the result
    var diceDOM =  document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/images/' + 'dice-' + dice + '.png'

    //update round score IF the rolled number was not a 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
       nextPlayer();
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //add current score to global score
    scores[activePlayer] += roundScore;
    
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //next 
    nextPlayer();
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
};

//Toggle between player and dice
//document.querySelector('#current-' + activePlayer).textContent = dice;