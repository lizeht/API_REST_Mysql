const {Router} = require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConection = require("../database");

// LOGIN
router.get('/:username/:password', (req, res) => {
    const {username,password} = req.params;
    mysqlConection.query("SELECT iduser,role FROM users WHERE username=? AND password= ?",[username,password], (err, rows, fileds) => {
        if (err) {
          console.log("Err  1",err); 
        } else {
          if(rows.length > 0){
            res.json({"logged": "success","type": (rows[0].role) ,"message":"user logged","user_id": (rows[0].iduser)});
          }else{
            mysqlConection.query("SELECT iduser,role FROM users WHERE username=?",[username, password], (err, rows, fileds) => {
              if(err){
                console.log("Err  2",err);                
               }else{
                if(rows.length > 0){
                 res.json({"logged": "null","type":"null","message":"password invalid","user_id": "null"}); 
                }else{
                  mysqlConection.query("SELECT iduser,role FROM users WHERE password=?",[username, password], (err, rows, fileds) => {
                    if(err){
                      console.log("Err  3",err);                
                     }else{
                       res.json({"logged": "null","type":"null","message":"user not exist","user_id": "null"}); 
                     
                      }
                    
             }); 
           }

        }
    });
  }
          }
});
        
        });




module.exports = router;