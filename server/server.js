const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Message emitted when user joins
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Message emitted when new user joins
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', (reason) => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started server on ${port}`);
});
