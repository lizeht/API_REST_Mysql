const {
    Router
} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");



    //BUSCAR IdOrder
router.get('/:idorder', function (req, res) {
    const {idorder}= req.params;
    mysqlConection.query("SELECT * FROM orders JOIN locals JOIN adresses JOIN detail_order JOIN products_local JOIN products WHERE orders.idorder=? LIMIT 1", [idorder], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    })
    });
    
    module.exports = router;