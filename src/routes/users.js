const {
    Router
} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");

//agrega Elemntos
router.post('/', function (req, res) {
  console.log(req.body);
  
    const {username, email, password, names,lastnames, phone, photo, role } = req.body;
    mysqlConection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,?,NULL,NULL)", [username, email, password, names,lastnames, phone, photo,role], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {

            res.json({
                "status": "user inserted"
            })
        }
    })

});
router.post('/client/', function (req, res) {
    console.log(req.body);
    const {username,email,password,names, lastnames, phone, photo, url_identification, region, birthday} = req.body;
      mysqlConection.query("INSERT INTO clients VALUES(NULL,?,?,?)", [url_identification, region, birthday], (err, row, fields) => {
          if (err) {
              console.log(err);
          } else {
    mysqlConection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,'client',?,NULL)", [username,email,password,names, lastnames, phone, photo,row.insertId], (err, row, fields) => {
                if (err) {
                    console.log(err)
                }else{
                   res.json({"status": "client inserted" }) 

                }
            });
          }
      })
  
  });
  router.post('/deliveries/', function (req, res) {
    console.log(req.body);
    const {username,email,password,names, lastnames, phone, photo,url_identification,url_licence,balance,total_orders} = req.body;
      mysqlConection.query("INSERT INTO deliveries VALUES(NULL,?,?,?,?)", [url_identification,url_licence,balance,total_orders], (err, row, fields) => {
          if (err) {
              console.log(err);
          } else {
    mysqlConection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,'client',NULL,?)", [username,email,password,names, lastnames, phone, photo,row.insertId], (err, row, fields) => {
                if (err) {
                    console.log(err)
                }else{
                   res.json({"status": "delivery inserted" }) 

                }
            });
          }
      })
  
  });
  router.get('/', (req, res) => {
    mysqlConection.query("SELECT * FROM users", (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});

router.get('/clients', (req, res) => {
    mysqlConection.query("SELECT * FROM clients", (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});

router.get('/deliveries', (req, res) => {
    mysqlConection.query("SELECT * FROM deliveries", (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});



//elimnina Elementos users
router.delete('/:iduser', function (req, res) {
    const {iduser}= req.params;
    mysqlConection.query("DELETE FROM users WHERE iduser  = ?", [iduser], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                "status": "users deleted"
            });
        }
    })
    });

    //elimnina Elementos clients
    router.delete('/client/:idclient', function (req, res) {
        const {idclient}= req.params;
        mysqlConection.query("DELETE clients.*,users.* FROM clients JOIN users ON users.client = clients.idclient WHERE clients.idclient  = ?", [idclient], (err, row, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    "status": "client deleted"
                });
            }
        })
        });
         //elimnina Elementos Deliveries
    router.delete('/deliveries/:idsellers', function (req, res) {
        const {idsellers}= req.params;
        mysqlConection.query("DELETE deliveries.*,users.* FROM deliveries JOIN users ON users.delivery = deliveries.idsellers WHERE deliveries.idsellers  = ?", [idsellers], (err, row, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    "status": "delivery deleted"
                });
            }
        })
        });

module.exports = router;