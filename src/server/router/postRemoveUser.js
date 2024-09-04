const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    const { username } = req.body;
    const usersPath = path.join(__dirname, 'data', 'users.json');

    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).send('Server error reading users.json');
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.username === username);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);

            fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing users.json:', err);
                    return res.status(500).send('Server error writing users.json');
                }
                res.send({ success: true, message: `User ${username} removed successfully` });
            });
        } else {
            res.status(404).send('User not found in users.json');
        }
    });
};
