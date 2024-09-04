const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const newGroup = req.body;
    const groupFilePath = path.join(__dirname, '..', 'data', 'group.json'); // Ensure the path is correct

    // Read the current groups from the file
    fs.readFile(groupFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error');
        }

        let groups = JSON.parse(data);

        // Assign a new unique ID to the group
        newGroup.id = groups.length ? groups[groups.length - 1].id + 1 : 1;

        // Initialize channels if not provided
        if (!newGroup.channels) {
            newGroup.channels = [];
        }

        // Add the new group to the list
        groups.push(newGroup);

        // Write the updated groups back to the file
        fs.writeFile(groupFilePath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to group.json:', err);
                return res.status(500).send('Server error');
            }
            res.send(newGroup);
        });
    });
};
