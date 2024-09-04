const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const { groupId, channelName, channelDescription, username } = req.body;
    const groupFilePath = path.join(__dirname, '..', 'data', 'group.json');

    // Read the current groups from the file
    fs.readFile(groupFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error');
        }

        let groups = JSON.parse(data);
        let group = groups.find(g => g.id === groupId);

        if (!group) {
            return res.status(404).send('Group not found');
        }

        // Check if the user is the creator of the group
        if (group.createdBy !== username) {
            return res.status(403).send('You do not have permission to create channels in this group');
        }

        // Create new channel
        const newChannel = {
            id: group.channels.length ? group.channels[group.channels.length - 1].id + 1 : 1,
            name: channelName,
            description: channelDescription || ""
        };

        // Add the new channel to the group
        group.channels.push(newChannel);

        // Write the updated groups back to the file
        fs.writeFile(groupFilePath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to group.json:', err);
                return res.status(500).send('Server error');
            }
            res.send(newChannel);
        });
    });
};
