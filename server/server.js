const PORT = 8888;

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://s5294121.elf.ict.griffith.edu.au:8080", // Allow specific origin
    methods: ["GET", "POST"],
    credentials: true // Allows cookies and credentials
  }
});
const sockets = require('./sockets.js');

// Apply middleware
app.use(cors({
  origin: 'http://s5294121.elf.ict.griffith.edu.au:8080', // Allow specific origin
  methods: ['GET', 'POST'],
  credentials: true // Allows cookies and credentials
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the data directory
app.use('/server/data', express.static(path.join(__dirname, 'data')));

// Login routes
app.post('/login', require('./router/postLogin'));
app.post('/joinChannel', require('./router/postJoinChannel'));
app.post('/CreateGroup', require('./router/postCreateGroup'));
app.post('/createChannel', require('./router/postCreateChannel'));
app.post('/deleteGroup', require('./router/postDeleteGroup'));
app.post('/deleteChannel', require('./router/postDleteChannel'));
app.post('/promoteToGroupAdmin', require('./router/postPromoteToGroupAdmin'));
app.post('/promoteToSuperAdmin', require('./router/postPromoteToSuperAdmin'));
app.post('/removeUser', require('./router/postRemoveUser'));
app.post('/joinGroup', require('./router/postJoinGroup'));
app.post('/createUser', require('./router/postCreateUser'));

// Delete user route
app.post('/deleteUser', (req, res) => {
    const { username } = req.body;
    const usersPath = path.join(__dirname, 'data', 'users.json');
    
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error reading users.json');
        }
        let users = JSON.parse(data);
        const updatedUsers = users.filter(user => user.username !== username);

        fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Server error writing users.json');
            }
            res.send({ success: true, message: `User ${username} deleted successfully` });
        });
    });
});

// Setup socket connections
sockets.connect(io, PORT);

// Start server listening for requests
// Start server listening for requests
http.listen(PORT, () => {
  console.log('Server listening on: ' + PORT);
});

module.exports = http; // Export http instead of server
