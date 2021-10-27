const express=require('express');
let router = express.Router();
let home=require('./home');
const { route } = require('./login');
let login=require('./login');
let register=require('./register');
//let redirect=require('./redirect');
let vote=require('./vote');
let logout=require('./logout')



router.use('/',home);
router.use('/login',login,vote);
//router.use('/login/loggedin',login);
router.use('/register',register);
//router.use('/vote',vote);
router.use('/logout',logout);


module.exports=router;