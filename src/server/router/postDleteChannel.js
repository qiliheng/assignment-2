const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
    const { channelId, groupId, username } = req.body;
    const filePath = path.join(__dirname, '../data/group.json');  // Ensure correct path

    // Read the group data from group.json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let groups = JSON.parse(data);
        const group = groups.find(g => g.id === groupId && g.createdBy === username);

        if (group) {
            const channelIndex = group.channels.findIndex(c => c.id === channelId);

            if (channelIndex !== -1) {
                group.channels.splice(channelIndex, 1);

                // Write the updated group data back to group.json
                fs.writeFile(filePath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to group.json:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    return res.status(200).json({ message: 'Channel deleted successfully' });
                });
            } else {
                return res.status(404).json({ error: 'Channel not found' });
            }
        } else {
            return res.status(403).json({ error: 'Unauthorized action or group not found' });
        }
    });
};
