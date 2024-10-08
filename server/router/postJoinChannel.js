const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const { userId, groupId, channelId } = req.body;
    const groupFilePath = path.join(__dirname, '../data/group.json');
    
    fs.readFile(groupFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read group.json:', err);
            res.status(500).json({ error: 'Failed to read group.json' });
            return;
        }

        let groups = JSON.parse(data);
        let group = groups.find(g => g.id === groupId);

        if (!group) {
            res.status(404).json({ error: 'Group not found' });
            return;
        }

        let channel = group.channels.find(c => c.channelId === channelId);

        if (!channel) {
            res.status(404).json({ error: 'Channel not found' });
            return;
        }

        if (!channel.members) {
            channel.members = [];
        }

        if (!channel.members.includes(userId)) {
            channel.members.push(userId);

            fs.writeFile(groupFilePath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Failed to update group.json:', err);
                    res.status(500).json({ error: 'Failed to update channel members' });
                    return;
                }

                res.json({ ok: true, message: 'User joined channel successfully' });
            });
        } else {
            res.json({ ok: false, message: 'User already a member of this channel' });
        }
    });
};
