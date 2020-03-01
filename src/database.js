const mysql=require ("mysql");

//CONEXION CON BD DE XAMPP
const mysqlConnection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"adomicilio",
    multipleStatements:true
});

//VERIFICACION DE CONEXION
mysqlConnection.connect(function(err){
    if(err){
        console.log("Error",err);
    }else{
        console.log("DB is conected");
    }
});

//PARA EXPORTAR LA COLECCION
module.exports = mysqlConnection;