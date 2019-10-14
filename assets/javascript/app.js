//Variables to keep track of score
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying) {
    //random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'assets/images/' + 'dice-' + dice1 + '.png'
    document.getElementById('dice-2').src = 'assets/images/' + 'dice-' + dice2 + '.png'

    //update round score IF the rolled number was not a 1
    if (dice1 !== 1 && dice2 !== 1) {
        //Add score
        roundScore += dice1 + dice2;
        

        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
    }
    /*
        if (dice === 6 && lastDice === 6) {
            //Player looses score if roll 6 two times in a row
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
    }

     lastDice = dice;
    */
   }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
   if (gamePlaying) {

      //add current score to global score
      scores[activePlayer] += roundScore;
    
      //update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var winningScore;
     //undefined, 0, null or "" are coerced to false
     //anything else is coerced to true
     
      if (input){
        winningScore = input;
      } else {
          winningScore = 100;
      }
  
      //check if player won the game
      if (scores[activePlayer] >= winningScore) {
          document.querySelector('#name-' + activePlayer).textContent = "Winner!!"
          document.getElementById('dice-1').style.display = 'none';
          document.getElementById('dice-2').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
      } else {
          //next 
          nextPlayer();
      }

   }

    
});


function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active'); 

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

//reset game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //Hide dice on game load
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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

