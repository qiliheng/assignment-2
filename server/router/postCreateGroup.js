const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const newGroup = req.body;
    const groupFilePath = path.join(__dirname, '..', 'data', 'group.json'); 


    fs.readFile(groupFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading group.json:', err);
            return res.status(500).send('Server error');
        }

        let groups = JSON.parse(data);


        newGroup.id = groups.length ? groups[groups.length - 1].id + 1 : 1;


        if (!newGroup.channels) {
            newGroup.channels = [];
        }

        groups.push(newGroup);

        fs.writeFile(groupFilePath, JSON.stringify(groups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to group.json:', err);
                return res.status(500).send('Server error');
            }
            res.send(newGroup);
        });
    });
};
