import express from 'express'
import http from 'http'       // node module 
import { Server } from 'socket.io'

const app = express();

const nodeEnv = process.env.NODE_ENV;
const socketServerUrl = nodeEnv == 'development' ? 'http://localhost:5173' : 'https://kurier-msh1.onrender.com';

const server = http.createServer(app);      // for socket io we need http server so we are creating it with our express app

// here io is a socket server
// io might get cors error while connecting to frontend so we give cors option
const io = new Server(server, {
  cors: {
    origin: [socketServerUrl],
    methods: ['GET', 'POST']
  }
});


// now for chats to be real-time too, we need to make use of socket ->we will get userId from FE and find its socketId in userToSocketMap and return that socketId 

export const getReceiverSocketId = (receiverUserId) => {
  return userSocketMap[receiverUserId];
}





// const userToSocketMap = new Map();
const userSocketMap = {}; // {userId: socketId}

// listening to connection 

// The io.on('connection', ...) function is an event listener that is triggered whenever a new client connects to the server
// When a new client connects, the provided callback function will be executed.where it logs a message, indicating that a new user has connected, along with the unique ID (socket.id) assigned to the client socket.
// This ID can be used to identify and interact with specific clients in the server-side code.
io.on('connection', (socket) => {
  // here socket is a new client/user
  // console.log("socket -> ", socket)
  console.log(`User connected: ${socket.id}`);

  // getting userId from FE (query) and then saving it in userToSocketMap
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    // userToSocketMap.set(userId, socket.id);
    userSocketMap[userId] = socket.id;
  }


  // whenever the userToSocketMap changes, we will broadcast/emit it to all connected clients
  // io.emit is used to emit an event to all connected clients
  // io.emit('getOnlineUsers', userToSocketMap.keys());
  io.emit('getOnlineUsers', Object.keys(userSocketMap));


  // The socket.on(...) function is an event listener that is triggered whenever a new client sends data to the server

  // This code snippet listens for a 'disconnect' event on a socket connection. When a client disconnects, it logs a message indicating that the user associated with the disconnected socket has disconnected along with the unique socket ID.
  // this is to monitor other users online status, ( whenever there a user is/goes offline an event will be triggered)  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // userToSocketMap.delete(socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

  })
})



export { app, io, server };


