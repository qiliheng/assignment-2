var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username || req.body.email;  
    var p = req.body.pwd;
    
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => 
            (user.username === u || user.email === u) && user.pwd === p);
        
        if (i === -1) {
            res.send({
                "ok": false,
                "error": "User not found"
            });
        } else {
            let userData = userArray[i];
            userData["ok"] = true;
            res.send(userData);
        }
    });
};
