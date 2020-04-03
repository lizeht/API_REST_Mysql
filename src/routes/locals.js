const {Router} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");

// obtiene Elemnetos
router.get('/', (req, res) => {
    mysqlConection.query("SELECT * FROM locals", (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});
//agrega Elemntos
router.post('/', function (req, res) {
  console.log(req.body);
  
    const {name,description,url_image, category
    } = req.body;
    mysqlConection.query("INSERT INTO locals VALUES(NULL,?,?,?,?)", [name,description,url_image, category], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                "status": "locals inserted"
            })
        }
    })

});
//elimnina Elemntos
router.delete('/:idlocal', function (req, res) {
const {idlocal}= req.params;
mysqlConection.query("DELETE FROM locals WHERE idlocal  = ?", [idlocal], (err, row, fields) => {
    if (err) {
        console.log(err);
    } else {
        res.json({
            "status": "locals deleted"
        });
    }
})

});

//Actualiza Elemntos
router.put('/:idlocal', function (req, res) {
    const {idlocal}=req.params;
    const { name,description,category,url_image } = req.body;
    mysqlConection.query("UPDATE locals SET name =?, description =?,category=?, url_image =?  WHERE idlocal=?", [name,description,url_image,category,idlocal], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({"status": "locals Uptate"});
        }
    })

});
   //US8 1
   router.get('/status/:idlocal', function (req, res) {
   const {idlocal}=req.params;
    mysqlConection.query("SELECT * FROM locals, orders JOIN clients WHERE  orders.local = locals.idlocal AND orders.client = clients.idclient AND orders.status_local='PENDIENTE' AND locals.idlocal = ? ORDER BY orders.date_ordened ASC", [idlocal], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    })
    });
//US8 2
router.get('/status2/:idlocal', function (req, res) {
    const {idlocal}=req.params;
     mysqlConection.query("SELECT * FROM locals, orders JOIN clients WHERE  orders.local = locals.idlocal AND orders.client = clients.idclient AND orders.status_local='ENVIADO' AND locals.idlocal = ? ORDER BY orders.date_ordened ASC", [idlocal], (err, rows, fields) => {
         if (err) {
             console.log(err);
         } else {
             res.json(rows);
         }
     })
     });
     router.get('/status3/:region/', function (req, res) {
        const {region}=req.params;
         mysqlConection.query("SELECT * FROM orders JOIN clients WHERE orders.status_local='PENDIENTE' AND clients.region= ?" , [region], (err, rows, fields) => {
             if (err) {
                 console.log(err);
             } else {
                 res.json(rows);
             }
         })
         });
         router.get('/status4/:idclient', function (req, res) {
            const {idclient}=req.params;
             mysqlConection.query("SELECT * FROM orders JOIN clients WHERE orders.client=clients.idclient AND clients.idclient= ? AND orders.status_delivery !='ENTREGADO' AND orders.status_delivery !='ENTREGADO'" , [idclient], (err, rows, fields) => {
                 if (err) {
                     console.log(err);
                 } else {
                     res.json(rows);
                 }
             })
             });

module.exports = router;