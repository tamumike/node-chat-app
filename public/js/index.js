var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  // console.log('New message: ', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', (msg) => {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();

  var msgTxtBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: msgTxtBox.val()
  }, () => {
    msgTxtBox.val('');
  });
});

var locBtn = $('#send-location');
locBtn.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locBtn.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locBtn.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location.');
  });
});
