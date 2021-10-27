const express=require('express');
let router = express.Router();
const path = require('path');

//console.log(path.dirname(__dirname));


router.get('/',(req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    res.sendFile(path.dirname(__dirname) + '/static/home.html');
  });



module.exports=router;