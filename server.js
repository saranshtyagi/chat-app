const express = require('express'); 
const http = require('http'); 
const socketIo = require('socket.io'); 

const app = express(); 

const server = http.createServer(app);

// intiate socket.io and attach with http server
const io = socketIo(server); 

app.use(express.static('public')); 

const users = new Set(); 

io.on("connection", (socket) => {
    console.log("A user is now connected!");
    //handle users when they join chat 
    socket.on('join', (userName) => {
        users.add(userName);

        //broadcast to all users that a new user has joined
        io.emit('userJoined', userName);

        //Send the updated user list to all clients 
        io.emit('userList', Array.from(users));
    });
    //handle incoming chat message

    //handle user disconnection
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});