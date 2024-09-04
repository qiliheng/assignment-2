var fs = require('fs');
var path = require('path');

module.exports = function(req, res) {
    var newUser = req.body;

    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        
        let users = JSON.parse(data);

        // Check if the username already exists
        let userExists = users.find(user => user.username === newUser.username);
        if (userExists) {
            return res.status(400).send({ ok: false, error: 'Username already exists' });
        }

        // Add the new user
        users.push(newUser);

        // Save the updated users list
        fs.writeFile('./data/users.json', JSON.stringify(users, null, 2), 'utf8', function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }
            res.send({ ok: true, message: 'User created successfully' });
        });
    });
};

