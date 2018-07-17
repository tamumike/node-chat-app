var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  console.log('New message: ', msg);
});

// socket.on('welcomeMsg', (msg) => {
//   console.log(msg);
// });
//
// socket.on('userJoined', (msg) => {
//   console.log(msg);
// });


// newMessage, createMessage
