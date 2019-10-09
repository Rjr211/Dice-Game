//Variables to keep track of score
var scores, roundScore, activePlayer;

init();



document.querySelector('.btn-roll').addEventListener('click', function(){
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display the result
    var diceDOM =  document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/images/' + 'dice-' + dice + '.png'

    //update round score IF the rolled number was not a 1
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //add current score to global score
    scores[activePlayer] += roundScore;
    
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= 10) {
        document.querySelector('#name-' + activePlayer).textContent = "Winner!!"
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        //next 
        nextPlayer();
    }

    
});


function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active'); 

        document.querySelector('.dice').style.display = 'none';
}

//reset game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    //Hide dice on game load
    document.querySelector('.dice').style.display = 'none';

    //set defaults to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
} 

//Toggle between player and dice
//document.querySelector('#current-' + activePlayer).textContent = dice