# tictactoe-live


This project uses following packages
→ express,http,jquery,nodemn,path,router,socket.io

->This project uses following packages
→ express,http,jquery,nodemn,path,router,socket.io



-->To run the App
--> Use command nodemon index.js

→ Open 2 tabs sidewise and run http://localhost:5050/  on both tabs


App Introduction
 →Created a file index.js in the root of app, This will handle all the events we receive and manage the game

 → Created app1.html to handle the UI

  → I have used Socket.io which is responsible for connecting both the tabs/users

 → Socket.io helps to keep track of game , allows to create room, helps to create communication between the users

 → chat_engine.js file  is responsible for handling game logic.

 → with following event handlers endGame, restartGame, nextTurn
,boxClicked


Endgame->Notify players that game has ended and which player has won.

Restart Game -> Create a new game room and notify the creator of game.

Next Turn→ Changes the turn after every one chance

Boxclicked → Update the clicked box

 → After every row,col,or diagonal match, game ends after notifying the winner

→ If any user is disconnect then the other user wins the game and shows an alert message
