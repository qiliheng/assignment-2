const PORT = 8888; 

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // <-- Add this line

app.use(cors());
const http = require('http').Server(app);
const postJoinGroup = require('./router/postJoinGroup');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the data directory
app.use('/server/data', express.static(path.join(__dirname, 'data')));


// Login routes
app.post('/login', require('./router/postLogin'));
app.post('/joinChannel', require('./router/postJoinChannel')); 
app.post('/CreateGroup', require('./router/postCreateGroup'));
app.post('/CreateChanne;', require('./router/postCreateChannel'));
// Require your postJoinGroup file
// Add the route for joining a group
app.post('/joinGroup', postJoinGroup);
app.post('/createUser',require('./router/postCreateUser'));

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



// Promote a user to Group Admin
app.post('/promoteToGroupAdmin', (req, res) => {
    const userId = req.body.userId;
    const usersPath = './data/users.json';
    const extendedUsersPath = './data/extendedUsers.json';

    fs.readFile(extendedUsersPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server error');

        let extendedUsers = JSON.parse(data);
        let user = extendedUsers.find(u => u.userid === userId);

        if (user) {
            user.role = 'group-admin';
            fs.writeFile(extendedUsersPath, JSON.stringify(extendedUsers, null, 2), 'utf8', (err) => {
                if (err) return res.status(500).send('Server error');
                
                fs.readFile(usersPath, 'utf8', (err, data) => {
                    if (err) return res.status(500).send('Server error');

                    let users = JSON.parse(data);
                    let matchingUser = users.find(u => u.username === user.username);

                    if (matchingUser) {
                        matchingUser.role = 'group-admin';
                        fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                            if (err) return res.status(500).send('Server error');
                            res.send({ success: true, message: `${user.username} promoted to Group Admin` });
                        });
                    } else {
                        res.status(404).send('Matching user not found in users.json');
                    }
                });
            });
        } else {
            res.status(404).send('User not found in extendedUsers.json');
        }
    });
});

// Promote a user to Super Admin
app.post('/promoteToSuperAdmin', (req, res) => {
    const userId = req.body.userId;
    const usersPath = './data/users.json';
    const extendedUsersPath = './data/extendedUsers.json';

    fs.readFile(extendedUsersPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server error');

        let extendedUsers = JSON.parse(data);
        let user = extendedUsers.find(u => u.userid === userId);

        if (user) {
            user.role = 'super-admin';
            fs.writeFile(extendedUsersPath, JSON.stringify(extendedUsers, null, 2), 'utf8', (err) => {
                if (err) return res.status(500).send('Server error');
                
                fs.readFile(usersPath, 'utf8', (err, data) => {
                    if (err) return res.status(500).send('Server error');

                    let users = JSON.parse(data);
                    let matchingUser = users.find(u => u.username === user.username);

                    if (matchingUser) {
                        matchingUser.role = 'super-admin';
                        fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                            if (err) return res.status(500).send('Server error');
                            res.send({ success: true, message: `${user.username} promoted to Super Admin` });
                        });
                    } else {
                        res.status(404).send('Matching user not found in users.json');
                    }
                });
            });
        } else {
            res.status(404).send('User not found in extendedUsers.json');
        }
    });
});

app.post('/removeUser', (req, res) => {
    const userId = req.body.userId;
    console.log(`Received request to remove user with ID: ${userId}`);

    const usersPath = './data/users.json';
    const extendedUsersPath = './data/extendedUsers.json';

    fs.readFile(extendedUsersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading extendedUsers.json:', err);
            return res.status(500).json({ success: false, message: 'Server error reading extendedUsers.json' });
        }

        let extendedUsers = JSON.parse(data);
        let userIndex = extendedUsers.findIndex(u => u.userid === userId);

        if (userIndex !== -1) {
            let [removedUser] = extendedUsers.splice(userIndex, 1);
            console.log(`User found: ${removedUser.username}. Removing...`);

            fs.writeFile(extendedUsersPath, JSON.stringify(extendedUsers, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing extendedUsers.json:', err);
                    return res.status(500).json({ success: false, message: 'Server error writing extendedUsers.json' });
                }

                fs.readFile(usersPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading users.json:', err);
                        return res.status(500).json({ success: false, message: 'Server error reading users.json' });
                    }

                    let users = JSON.parse(data);
                    users = users.filter(u => u.username !== removedUser.username);

                    fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing users.json:', err);
                            return res.status(500).json({ success: false, message: 'Server error writing users.json' });
                        }
                        console.log(`User ${removedUser.username} removed successfully`);
                        return res.json({ success: true, message: `User ${removedUser.username} removed successfully` });
                    });
                });
            });
        } else {
            console.error(`User ID ${userId} not found in extendedUsers.json`);
            return res.status(404).json({ success: false, message: 'User not found in extendedUsers.json' });
        }
    });
});

app.get('/server/data/channels/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const channelsPath = './data/channel.json'; // Ensure this path is correct

    fs.readFile(channelsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server error');

        let channels = JSON.parse(data);
        let groupChannels = channels.filter(channel => channel.groupId === parseInt(groupId));

        res.json(groupChannels);
    });
});


// Start the server
http.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});
