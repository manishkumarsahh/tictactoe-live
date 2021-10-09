
module.exports.chatSockets = function(socketServer){
    
    const io = require('socket.io')(socketServer);
    
    io.sockets.on('connection', function(socket){

            
            
        
       
        

        
        socket.on('join_room', function(data){//!join room
            

            socket.join(data.chatBox);

            io.in(data.chatBox).emit('user_joined', data);//!user joined
        });

       
        
        

        socket.on('update_pattern', function(data){         //whenever a box is clicked
            
            socket.join(data.chatBox);
            
            io.in(data.chatBox).emit('update_pattern1', data);
            
            
        });

        socket.on('update_span', function(data){            //to update the upper span which indicates turn
            
            socket.join(data.chatBox);
            io.in(data.chatBox).emit('update_span1', data);
        });

        socket.on('end_game', function(data){                   
            
            socket.join(data.chatBox);
            io.in(data.chatBox).emit('end_game1', data);
        });

        socket.on('restart_game', function(data){
            
            socket.join(data.chatBox);
            io.in(data.chatBox).emit('restart_game1', data);
        });

        socket.on('end_game2', function(data){
            
            socket.join(data.chatBox);
            io.in(data.chatBox).emit('end_game3', data);
        });

        socket.on('next_turn1', function(data){
            
            socket.join(data.chatBox);
            io.in(data.chatBox).emit('next_turn12', data);
        });
        
        socket.on('disconnect', function(){ 
            io.emit('disconnected'); 
            console.log('socket disconnected!');
            
        });

        
        


    });

}