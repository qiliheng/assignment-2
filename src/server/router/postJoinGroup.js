const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const username = req.body.username;
    const groupId = req.body.groupId;

    const usersPath = path.join(__dirname, '../data/users.json');

    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error reading users.json');
        }

        let users = JSON.parse(data);
        let userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            let user = users[userIndex];

            // Ensure groups array exists
            if (!user.groups) {
                user.groups = [];
            }

            // Add the group to the user's joined groups if not already added
            if (!user.groups.includes(groupId)) {
                user.groups.push(groupId);
            } else {
                return res.send({ success: false, message: `Already joined group ${groupId}.` });
            }

            // Save the updated users list back to the file
            fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).send('Server error writing users.json');
                }
                res.send({ success: true, message: `Group ${groupId} added to user ${user.username}` });
            });
        } else {
            res.status(404).send('User not found');
        }
    });
};
