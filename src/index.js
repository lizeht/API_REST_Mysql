const express=require('express');
const morgan=require('morgan');
const app=express();

//SETTINGS
app.set('port', 3000);

//MIDDELWARE
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//ROUTES
//app.use(require('/routes'));
app.use('/api/locals',require('./routes/locals'));
app.use('/api/users',require('./routes/users'));
app.use('/api/products',require('./routes/products'));
app.use('/api/login',require('./routes/login'));
app.use('/api/order',require('./routes/order'));
app.use('/api/productslocal',require('./routes/productslocal'));

//STARTING SERVE
app.listen(app.get('port'),() =>{
    console.log("Server on port "+app.get('port'));
});

