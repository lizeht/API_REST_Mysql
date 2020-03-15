const { Router} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");


//agrega Elemntos
router.post('/', function (req, res) {
  console.log(req.body);
  
    const {barcode,name,url_image,description} = req.body;
    mysqlConection.query("INSERT INTO products VALUES(?,?,?,?)", [barcode,name,url_image,description], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                "status": "product inserted"
            })
        }
    })

});

  //BUSCAR PRODUCTS POR BARCODE
  router.get('/:barcode', function (req, res) {
    const {barcode}= req.params;
    mysqlConection.query("SELECT * FROM products WHERE barcode = ?", [barcode], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    })
    });
     //BUSCAR PRODUCTS POR BARCODE,NAME,CATEGORY CON LIMIT
  router.get('/search/:text/:start/:end', function (req, res) {
    const {text,start,end}= req.params;
    mysqlConection.query("SELECT * FROM products JOIN products_local ON products.barcode = products_local.product WHERE products.barcode = ? OR products.name LIKE '%"+text+"%' OR products_local.category = ? LIMIT "+start+","+end, [text,text], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    })
    });
       

        //MOSTRAR PRODUCTS_LOCAL Y PRODUCTS COMBINADOS
        router.get('/:start/:end', (req, res) => {
            const {start,end}= req.params;
            mysqlConection.query("SELECT * FROM products_local JOIN products ON products.barcode = products_local.product LIMIT "+start+","+end, (err, rows, fileds) => {
                if (err) {
                    console.log("Error;", err);
                } else {
                    res.json(rows);
                }
            });
        
        });
    /*router.post('/pro/', function (req, res) {
    console.log(req.body);
    const {stock,ennabled, price_buy , price_sell, price_wholesale,category,barcode,name,url_image,description} = req.body;
      mysqlConection.query("INSERT INTO products VALUES(?,?,?,?)", [barcode,name,url_image,description], (err, row, fields) => {
          if (err) {
              console.log(err);
          } else {
    mysqlConection.query("INSERT INTO products_local VALUES(NULL,?,?,?,?,?,?,?)", [stock,ennabled, price_buy , price_sell, price_wholesale,category,barcode], (err, row, fields) => {
                if (err) {
                    console.log(err)
                }else{
                   res.json({"status": "delivery inserted" }) 

                }
            });
          }
      })
  
  });*/

/*//BUSCAR POR NAME
    router.get('/nameByProducts/:name', function (req, res) {
        const {name}= req.params;
        mysqlConection.query("SELECT * FROM products WHERE name LIKE '%"+name+"%'", [name], (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        })
        });

       

        //MOSTRAR PRODUCTS_LOCAL Y PRODUCTS COMBINADOS
        router.get('/', (req, res) => {
            mysqlConection.query("SELECT * FROM products_local JOIN products", (err, rows, fileds) => {
                if (err) {
                    console.log("Error;", err);
                } else {
                    res.json(rows);
                }
            });
        
        });*/



module.exports = router;