
class ChatEngine{
    constructor(playgame){
        this.chatBox = $(`#${playgame}`);
        this.socket = io.connect('http://localhost:5050');
        this.connectionHandler();
        

    }


    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            self.socket.emit('join_room', {//!join room
                chatBox: 'game'
            });

            self.socket.on('user_joined', function(data){//!user joined
                console.log('a user joined!', data);
                
            })


        });

         


         // constants
const STARTED = 0                   
const ENDED = 1

// HTML elements
const playerSpan = document.getElementById('player')
const gameTable = document.getElementById('game')

const game = {
  state: STARTED,
  turn: 'X',
  move: 0
}

function endGame(winner) {          
    self.socket.emit('end_game2', {
        game:ENDED
    } );
    
    
      self.socket.on('end_game3', function(data){
        if (winner) {
            alert('Game Over || Winner = ' + winner)
        } else {
            console.log("here1");
            alert('Game Over || Draw')
        }
        game.state = data.game
    })
    
}

function restartGame() {
 
     
        game.turn = 'X';
        playerSpan.textContent = game.turn
    
        game.state = STARTED;
        game.move = 0;
    
        Array.from(document.getElementsByTagName('td')).forEach(cell => {
            cell.textContent = '';
        });
     
    



    
   
}

function nextTurn() {
    if (game.state === ENDED) return
    if (game.turn == 'X') game.turn = 'O'
        else game.turn = 'X'
    
      
    game.move++;
  
    if (game.move == 27) {
        endGame()
    }
 
    playerSpan.textContent = game.turn
}




//to check if isequence has matched the winning combo
function isSeqCaptured(arrayOf3Cells) {                 
    let winnningCombo = game.turn + game.turn + game.turn
    if (arrayOf3Cells.map(i => i.textContent).join('') === winnningCombo) {
        endGame(game.turn)
    }
}

//matching sequence in rows
function isRowCaptured(row) {
    let tableRow = Array.from(gameTable.children[0].children[row - 1].children)
    isSeqCaptured(tableRow)
}

//matching sequence in cols
function isColCaptured(col) {
    let tableCol = [
        gameTable.children[0].children[0].children[col - 1],
        gameTable.children[0].children[1].children[col - 1],
        gameTable.children[0].children[2].children[col - 1]
    ]
    isSeqCaptured(tableCol)
}

//matching sequence in diagonally
function isDiagCaptured(row, col) {
    if (row !== col && (row + col) !== 4) return
    let diag1 = [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ]
    let diag2 = [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ]
    isSeqCaptured(diag1)
    isSeqCaptured(diag2)


}


//this function is called after any box is clicked
function boxClicked(row, col) {
  if (game.state === ENDED) {
 
        alert('Game Ended | Restart to Play Again')
        return
     
  }
  
  self.socket.emit('update_pattern', {
    row:row,
    col:col,
    turn:game.turn
  });

  self.socket.on('update_pattern1', function(data){
      if(data.row == '-1'){
        let row = data.row;
        let col = data.col;
      }else{
        let row = data.row;
        let col = data.col;
        let clickedBox = gameTable.children[0].children[row - 1].children[col - 1];
        clickedBox.textContent = data.turn
        
        
        isRowCaptured(row)
        isColCaptured(col)
        isDiagCaptured(row, col)
        nextTurn();
      }
        
    })

    


}
        
        //for restart button
        $('#restart').click(function(){
                    
             
            restartGame();
            game.move = 0;
            self.socket.emit('restart_game', {
                game:'restart'
           });
           
           
             self.socket.on('restart_game1', function(data){
               game.turn = 'X';
               playerSpan.textContent = game.turn
           
               game.state = STARTED;
               game.move = 0;
           
               Array.from(document.getElementsByTagName('td')).forEach(cell => {
                   cell.textContent = '';
               });
           })
               


            
        });

        
  self.socket.on('disconnected', function(data){
     alert(game.turn+" - Won The Game")
      
  })


       
        



        $('#cliq1').click(function(){
             
            let msg = $('#cliq1').val(); 
            boxClicked(1, 1)
        });

        $('#cliq2').click(function(){

            let msg = $('#cliq2').val();
             
            boxClicked(1, 2)
        });

        $('#cliq3').click(function(){

            let msg = $('#cliq3').val();
             
            boxClicked(1, 3)
        });


        $('#cliq4').click(function(){

            let msg = $('#cliq4').val();
             
            boxClicked(2, 1)
        });

        $('#cliq5').click(function(){

            let msg = $('#cliq5').val();
             
            boxClicked(2, 2)
        });

        $('#cliq6').click(function(){

            let msg = $('#cliq6').val();
             
            boxClicked(2, 3)
        });

        $('#cliq7').click(function(){

            let msg = $('#cliq7').val();
             
            boxClicked(3, 1)
        });


        $('#cliq8').click(function(){

            let msg = $('#cliq8').val();
             
            boxClicked(3, 2)
        });

        $('#cliq9').click(function(){

            let msg = $('#cliq9').val();
            
            boxClicked(3, 3)
        });


        
         


    }
}

