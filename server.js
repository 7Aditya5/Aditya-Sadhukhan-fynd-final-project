require( 'dotenv' ).config();
const express=require( 'express' );
const bodyParser= require('body-parser');
const routes= require('./routes');
const mongoose = require('mongoose');
var session = require('express-session');
const cors = require('cors');






const Port = process.env.PORT;
let app=express();

const {NODE_ENV,DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,SECRET_KEY}=process.env;


const dburl=(NODE_ENV==='development')?`mongodb://${DB_HOST}/${DB_NAME}`:
`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: '*'
}));

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use(routes);

//to handle invalid routes or routes not created in backend
app.get('*', function(req, res){
    res.status(404).send('Page not found');
  });

mongoose.connect(dburl).then(function(){
    console.log('connected to database')   
        app.listen(Port, function(){
            console.log("Server is running on" , Port)
        })
},function(error){
    console.log('error connecting to mongodb');
})





