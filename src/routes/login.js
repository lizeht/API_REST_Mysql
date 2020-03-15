const {
    Router
} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");

// obtiene Elemnetos
router.get('/:username/:password', (req, res) => {
    const {username,password} = req.body;
    mysqlConection.query("SELECT * FROM users WHERE users.username=? AND users.password= ?",[username,password], (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});




module.exports = router;