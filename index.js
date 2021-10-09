const express = require('express');
const app = express();

// setup the game server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5050);
console.log('chat server is listening on port 5050');

 

//connecting to views folder
app.set('views','./views');
app.use(express.static('views'));



//this will render to app1.html inside views folder
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/app1.html');
    
  });
  



app.listen('5000', function(req,res,err){
    if(err){
        console.log("Error in running server");
    }
    console.log("server running");
});

