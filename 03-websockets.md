# Media Distribution and Data Streams 3

## WebSockets

### "Problems" with a basic HTTP request-response model

- Server cannot answer without a request from client (server cannot push)
- Pull paradigm
- Polling
- Slow (=reply from server comes when it's requested)
- Eats resources (unnecessary responses and requests)
- Performance issues

### Characteristics of WebSockets

- [WebSocket](https://en.wikipedia.org/wiki/WebSocket) makes it possible to
  - **push messages** from server to client
  - have **persistent, two-way connections** between server and client
  - have blazing-fast messaging
- Client subscribes / starts listening (future) messages (from server)
- Server sends messages them whenever it likes
- **Note:** communication is connected and "stateful", and (also) thus different from REST paradigm
- [RFC 7936: The WebSocket protocol](https://tools.ietf.org/html/rfc6455)
- Application level protocol (like HTTP), runs on TCP
- Protocol prefix: _WS_ or _WSS_

### Why to use WebSockets?

- Real time messaging
- (For live video / audio, prefer WebRTC)
- Use cases
  - Social media, chat
  - Gaming
  - Remote commands
  - Collecting sensor data
  - Collaborative apps
  - etc.

### When not to use WebSockets?

- REST is enough
- No need for continuous real-time messaging
- Bit more difficult to implement than REST

### WebSocket API in JS 

- <https://developer.mozilla.org/en-US/docs/Web/API/WebSocket>
- Client side only

### WebSockets in Node.js

- Many libraries exist, e.g. [ws](https://www.npmjs.com/package/ws) and [Socket.IO](https://www.npmjs.com/package/socket.io)
- Today, we will concentrate on **Socket.IO**
  - Socket.IO: stable, well documented
  - High-level functionalities for messaging and session management
  - Easy to use
  - [Fallback](https://github.com/socketio/engine.io#goals) to HTTP / longpolling
- Can have several [concurrent connections](https://blog.jayway.com/2015/04/13/600k-concurrent-WebSocket-connections-on-aws-using-node-js/)

### Hands-on Socket.IO

- [Server API](https://socket.io/docs/v4/server-api/)
- [Client API](https://socket.io/docs/v4/client-api/)
- Server: `npm install socket.io`
- Client: load [library](https://github.com/socketio/socket.io-client/tree/master/dist) (optional)

#### Example, simple Socket.IO server

_chat-app/index.js_

```javascript
'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
```

Install Express & socket.io before running: `npm i express socket.io`. Start: `node index.js`

#### Simple Socket.IO client

_chat-app/public/index.html_:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="/socket.io/socket.io.js"></script>
  <script defer src="chat.js"></script>
  <title>Chat app</title>
</head>
<body>
  <form>
    <input type="text" id="m">
    <button type="submit">Send</button>
  </form>
  <ul id="messages"></ul>
</body>
</html>
```

_chat-app/public/chat.js_:

```javascript
'use strict';

// Server URL below must point to your server, localhost works for local development/testing
const socket = io('http://localhost:3000');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit('chat message', inp.value);
  inp.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  document.getElementById('messages').appendChild(item);
});
```

#### Socket.IO, core parts

- Both client & server connect
- Receiving messages: *socket.on('message', ...*
- Client can be identified by *session.id*
- Server has _rooms_, channels for grouping messages
- Sending messages, [Emit cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/):
  - **socket.emit** to sender only
  - **io.emit** to all clients
  - **socket.broadcast.emit** to all clients except sender
  - **socket.broadcast.to('room').emit** to room, to all clients except sender
  - **socket.join('some room')** join room (server side)
  - **socket.leave('some room')** leave room (server side)

#### Using Apache to serve the app (reverse proxy)

Example configuration using Let's encrypt's default SSL configuration file (`/etc/apache2/sites-available/000-default-le-ssl.conf`) replaces static document root folder with a node WebSocket service running on port 3000:

```conf
<VirtualHost *:443>

  # stuff ...

  # Disable document root folder
  # DocumentRoot /var/www/html
  
  # some more stuff ...

  # Add following:
  ProxyPass / http://localhost:3000/
  RewriteEngine on
  RewriteCond %{HTTP:Upgrade} WebSocket [NC]
  RewriteCond %{HTTP:Connection} upgrade [NC]
  RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
  ProxyTimeout 3

</VirtualHost>
```

If working with Ubuntu 22.04 default installation you need to enable modules `proxy`, `proxy_wstunnel` and `proxy_http` by using command `sudo a2enmod <MODULE-NAME>`.

After modifying conf file and enabling modules remember to restart Apache with `systemctl` command: `sudo systemctl restart apache2`.

---

## Assignment 3 - Chat application with Socket.IO

1. Prepare your Azure server environment: install _node.js_ and _npm_ (read e.g. [some instructions](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)):

    ```
    curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
    sudo bash /tmp/nodesource_setup.sh 
    sudo apt install nodejs
    ```
    
1. Create a website on your server in Azure environment, with input text, which will be broadcasted to other people in the same page, check [Get started](https://socket.io/get-started/chat)
    - Add a textfield for a user to give a nickname (e.g. *Charlie* says "Hello")
    - Add _rooms_ in your app: User can choose a room where she belongs to, and messages posted into a room
1. Explain _namespaces_ in Socket.IO? How they are different from rooms and how could you use those in your app?
1. Optional (for now): Run you app behind Apache [reverse proxy](https://socket.io/docs/v4/reverse-proxy/) using secure connection (SSL, port 443), [check example config above](#using-apache-to-serve-the-app-reverse-proxy)
1. Extra: You might want to use [PM2](https://pm2.keymetrics.io/) or similar to run your node application on server

**Note:** If you like, you can replace sending text with other data, like graphics, sensor data, sound, video...

Returning: Short report including your code and screen shots displaying the working app. Check assignment in OMA.  
Grading: max 4 points.
