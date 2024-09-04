const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

module.exports = function(req, res) {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: ['chat-user'], // Default role
        id: Date.now(), // Generate a unique ID based on the current timestamp
        groups: [] // Initialize an empty array for groups
    };

    const usersPath = path.join(__dirname, '../data', 'users.json');

    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error reading users.json' + JSON.stringify(err));
        }

        let users = JSON.parse(data);

        // Check for unique username
        if (users.some(user => user.username === newUser.username)) {
            return res.status(400).send('Username already exists');
        }

        users.push(newUser);

        fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Server error writing users.json');
            }
            res.send({ success: true, message: 'User created successfully' });
        });
    });
};
