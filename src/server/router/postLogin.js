var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    var p = req.body.pwd;
    
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => 
            (user.username == u) && (user.pwd == p));
        
        if (i == -1) {
            res.send({
                "ok": false,
                "error": "User not found"
            });
        } else {
            fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
                if (err) throw err;
                let extendedUserArray = JSON.parse(data);
                let userData = extendedUserArray.find(user => user.username == u);
                
                if (userData) {
                    userData["ok"] = true;
                    res.send(userData);
                } else {
                    res.send({
                        "ok": false,
                        "error": "User not found in extended user data"
                    });
                }
            });
        }
    });
};
