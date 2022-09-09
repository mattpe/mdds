'use strict';

// localhost for local dev only
const socket = io('http://localhost:3000');
//const socket = io('https://<your-server.xxx>.cloudapp.azure.com');

document.querySelector('#msg-input').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit('chat message', inp.value);
  inp.value = '';
});

document.querySelector('#join').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('username');
  socket.emit('join', inp.value);
  inp.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  document.getElementById('messages').appendChild(item);
});

socket.on('response', (msg) => {
  console.log(msg);
});