const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "s5294121.elf.ict.griffith.edu.au:8080",
    methods: ["GET", "POST"],
  }
});
const sockets = require('./sockets.js');
const server = require('./listen.js');
//const request = require('request');

//Define port used for the server
const PORT = 3000;
//Apply express middleware
app.use(cors());

//setup Socket
sockets.connect(io, PORT);

//Start server listening for requests.
server.listen(http, PORT);
