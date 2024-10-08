const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const { groupId, username } = req.body;

    const groupPath = path.join(__dirname, '../data', 'group.json');

    fs.readFile(groupPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error reading group.json');
        }

        let groups = JSON.parse(data);

        const groupIndex = groups.findIndex(group => group.id === groupId);
        const group = groups[groupIndex];

        if (group) {
            if (group.createdBy === username) {

                groups.splice(groupIndex, 1);

                fs.writeFile(groupPath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing group.json:', err);
                        return res.status(500).send('Server error writing group.json');
                    }

                    console.log(`Group ${groupId} deleted successfully`);
                    res.send({ success: true, message: `Group ${groupId} deleted successfully` });
                });
            } else {
                res.status(403).send('You are not authorized to delete this group.');
            }
        } else {
            res.status(404).send('Group not found');
        }
    });
};
