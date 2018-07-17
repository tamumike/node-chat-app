const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'tamulinden@gmail.com',
  //   text: 'Hey, what\'s going on?',
  //   createdAt: 123
  // });

  socket.emit('newMessage', {
    from: 'Augusta',
    text: 'Can I have 2 dinners?',
    createdAt: 400
  });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
  });

  socket.on('disconnect', (reason) => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started server on ${port}`);
});

// newMessage, createMessage (from, text, createdAt)
