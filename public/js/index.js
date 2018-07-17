var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey this is Michael.'
  // });

  socket.emit('createMessage', {
    from: 'tamulinden@gmail.com',
    text: 'You can have 1 and half.'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// socket.on('newEmail', (email) => {
//   console.log('New email.', email);
// });

socket.on('newMessage', (msg) => {
  console.log('New message: ', msg);
});


// newMessage, createMessage
