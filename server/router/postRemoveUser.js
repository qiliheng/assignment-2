const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    const { username } = req.body;
    const filePath = path.join(__dirname, '../data', 'users.json');


    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let users = JSON.parse(data);
        const updatedUsers = users.filter(user => user.username !== username);

        if (users.length === updatedUsers.length) {
            return res.status(404).json({ error: 'User not found' });
        }


        fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to users.json:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.status(200).json({ message: `User ${username} removed successfully` });
        });
    });
};
