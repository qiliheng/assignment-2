const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {

    console.log('Received data:', req.body);


    const { groupId, name: channelName, description: channelDescription, createdBy: username } = req.body;

    console.log('Group ID:', groupId);
    console.log('Channel Name:', channelName);
    console.log('Channel Description:', channelDescription);
    console.log('Username:', username);

    const groupPath = path.join(__dirname, '../data', 'group.json');

    fs.readFile(groupPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error reading group.json');
        }

        let groups = JSON.parse(data);
        console.log('Parsed groups:', groups);


        let group = groups.find(group => group.id === groupId);
        console.log('Selected group:', group);

        if (group) {

            if (group.createdBy === username) {

                const newChannel = {
                    id: Date.now(), 
                    name: channelName,
                    description: channelDescription,
                    createdBy: username
                };


                console.log('New channel:', newChannel);

                group.channels.push(newChannel);


                fs.writeFile(groupPath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing group.json:', err);
                        return res.status(500).send('Server error writing group.json');
                    }


                    console.log('Channel created successfully:', newChannel);
                    res.send(newChannel);
                });
            } else {
                console.error('User not authorized to create a channel in this group');
                res.status(403).send('You are not authorized to create a channel in this group.');
            }
        } else {
            console.error('Group not found');
            res.status(404).send('Group not found');
        }
    });
};
