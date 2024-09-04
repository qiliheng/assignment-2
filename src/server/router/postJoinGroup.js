const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const username = req.body.username;
    const groupId = req.body.groupId;

    // Path to the users.json file
    const usersPath = path.join(__dirname, 'data', 'users.json');
    
    console.log('Using path:', usersPath);

    // Read the users.json file
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).send('Server error reading users.json');
        }

        let users = JSON.parse(data);
        let userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            let user = users[userIndex];

            // Ensure the user has a groups array
            if (!user.groups) {
                user.groups = [];
            }

            // Add the group to the user's joined groups if not already added
            if (!user.groups.includes(groupId)) {
                user.groups.push(groupId);
            } else {
                console.log(`User ${username} already joined group ${groupId}`);
                return res.send({ success: true, message: `Already joined group ${groupId}.` });
            }

            // Save the updated users list back to the file
            fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to users.json:', err);
                    return res.status(500).send('Server error writing users.json');
                }
                
                console.log(`Group ${groupId} added to user ${user.username}`);
                res.send({ success: true, message: `Group ${groupId} added to user ${user.username}` });
            });
        } else {
            console.error('User not found');
            res.status(404).send('User not found');
        }
    });
};
