const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const newUser = req.body;
    const usersFilePath = path.join(__dirname, '../data/users.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read users.json:', err);
            res.status(500).json({ error: 'Failed to read users.json' });
            return;
        }

        let users = JSON.parse(data);

        // Check if the username already exists
        if (users.find(user => user.username === newUser.username)) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        users.push(newUser);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Failed to write to users.json:', err);
                res.status(500).json({ error: 'Failed to save user' });
                return;
            }

            res.json({ ok: true, message: 'User created successfully' });
        });
    });
};
