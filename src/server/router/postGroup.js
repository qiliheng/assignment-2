var fs = require('fs');

module.exports = function(req, res) {
    fs.readFile('./data/group.json', 'utf8', function(err, data) {
        if (err) {
            res.status(500).send({
                "ok": false,
                "error": "Failed to read group data"
            });
        } else {
            let groupArray = JSON.parse(data);
            res.send({
                "ok": true,
                "groups": groupArray
            });
        }
    });
};
