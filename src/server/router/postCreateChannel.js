const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    // Log the incoming request body to see what data is being sent
    console.log('Received data:', req.body);

    // Destructure the incoming data
    const { groupId, name: channelName, description: channelDescription, createdBy: username } = req.body;

    // Log the individual data points to verify they are correct
    console.log('Group ID:', groupId);
    console.log('Channel Name:', channelName);
    console.log('Channel Description:', channelDescription);
    console.log('Username:', username);

    // Adjust path based on actual location of group.json
    const groupPath = path.join(__dirname, '../data', 'group.json');

    // Attempt to read the group.json file
    fs.readFile(groupPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error reading group.json');
        }

        // Parse the JSON data and log it
        let groups = JSON.parse(data);
        console.log('Parsed groups:', groups);

        // Find the group by ID
        let group = groups.find(group => group.id === groupId);
        console.log('Selected group:', group);

        if (group) {
            // Check if the user is the creator of the group
            if (group.createdBy === username) {
                // Create a new channel object
                const newChannel = {
                    id: Date.now(), // Generate a unique ID for the channel
                    name: channelName,
                    description: channelDescription,
                    createdBy: username
                };

                // Log the new channel being added
                console.log('New channel:', newChannel);

                // Add the new channel to the group's channels array
                group.channels.push(newChannel);

                // Write the updated groups array back to the group.json file
                fs.writeFile(groupPath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing group.json:', err);
                        return res.status(500).send('Server error writing group.json');
                    }

                    // Send the newly created channel data back to the client
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
