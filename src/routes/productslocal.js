const {Router} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");

//ELIMINAR PRODUCTS_LOCAL
router.delete('/:idproducts_local', function (req, res) {
    const {idproducts_local}= req.params;
    mysqlConection.query("DELETE FROM products_local WHERE idproducts_local  = ?", [idproducts_local], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                "status": "products_local deleted"
            });
        }
    })
    });

    //BUSCAR PRODUCTS_LOCAL
router.get('/:idproducts_local', function (req, res) {
    const {idproducts_local}= req.params;
    mysqlConection.query("SELECT * FROM products_local WHERE idproducts_local  = ?", [idproducts_local], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    })
    });
    //agrega Elemntos en tabla de products_local
router.post('/', function (req, res) {
    console.log(req.body);
    
      const {stock,ennabled, price_buy , price_sell, price_wholesale,category,product} = req.body;
      mysqlConection.query("INSERT INTO products_local VALUES(NULL,?,?,?,?,?,?,?)", [stock,ennabled, price_buy , price_sell, price_wholesale,category,product], (err, row, fields) => {
          if (err) {
              console.log(err);
          } else {
              res.json({
                  "status": "product inserted"
              })
          }
      })
  
  });
  //Actualiza Producto
router.put('/:idproducts_local', function (req, res) {
    const {idproducts_local}=req.params;
    const {stock, ennabled, price_buy, price_sell, price_wholesale, category} = req.body;
    mysqlConection.query("UPDATE products_local SET stock =?, ennabled =?, price_buy=?, price_sell =?, price_wholesale = ?, category = ?  WHERE idproducts_local = ?", [stock, ennabled, price_buy, price_sell, price_wholesale, category, idproducts_local], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({"status": "locals Uptate"});
        }
    })

});
//MOSTRAR PRODUCTOS POR CATEGORIA
router.get('/mostrar/:category',function (req, res) {
    const {category}= req.params;
    mysqlConection.query("SELECT * FROM products JOIN products_local ON products.barcode = products_local.product WHERE products_local.category=?",[category], (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json(rows);
        }
    });

});

//MOSTRAR 10 PRODUCTOS POR CADA CATEGORIA
router.get('/',function (req, res) {
    const {category}= req.params;
    mysqlConection.query("SELECT * FROM products_local JOIN products ON products.barcode=products_local.product WHERE products_local.category IN (SELECT category FROM products_local GROUP BY category) ORDER BY products_local.category", (err, rows, fileds) => {
        if (err) {
            console.log("Error;", err);
        } else {
            res.json({"category":(rows[0].category),"":rows});
        }
    });
    module.exports = router;