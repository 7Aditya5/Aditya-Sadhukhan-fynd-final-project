const express=require('express');
let router = express.Router();
const path = require('path');
const mailing=require('./mail');
const mongoose=require('mongoose');
const {Usermodel,Candidatemodel}=require(path.join(path.dirname(__dirname),'/model/model.js'));
const crypto = require('crypto');


//console.log(path.join(path.dirname(__dirname),'/model.js'));

//console.log(Usermodel);
router.get('/',(req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    console.log();
    res.sendFile(path.dirname(__dirname) + '/static/register.html');

  });

router.post('/',async function(req,res,next){
   
              if(req.body.voter_name.length>1 && req.body.email)
              {
                   let user = await Usermodel.findOne({ email: req.body.email });
                         // console.log(user);
                          if (user) {
                              return res.status(400).send(`user already exists! click here to <a href='/login'> login </a>`);
                              
                          } 
                          else {
                            var ans = '';
                            var tendigitrandomnumber = Math.floor(1000000000 + Math.random() * 9000000000);
                            arr="12345abcde";
                          for (var i = 10; i > 0; i--) {
                              ans += 
                                arr[Math.floor(Math.random() * arr.length)];
                          }
                        console.log(ans);
                        console.log(tendigitrandomnumber);
                        
                        let pass=crypto.pbkdf2Sync(ans, '10',  
                          1000, 64, `sha512`).toString(`hex`); 
                     // console.log("pass",pass);
                        mailing.sendmail(tendigitrandomnumber,ans,req.body.email);

                        let userdata={
                          email:req.body.email,
                          voter_id: tendigitrandomnumber,
                          password:pass,
                          name: req.body.voter_name
                        }
                          console.log(userdata);
                       
                              // Insert the new user if they do not exist yet
                              user = new Usermodel(userdata);
                               user.save();
                              //res.send(user);
                              console.log("user added");
                             res.status(200).send("use credentials sent in your mail to login  click here to <a href='/login'> login </a>");
                            //res.status(200).redirect('/login');
                            }
              }
              else{
                return res.status(400).send(`need to register with proper manner first click here to <a href='/register'> register </a>`);
              }

                //res.send('ok received');
                        // mailing.sendmail(tendigitrandomnumber,ans,req.body.email);
                //setTimeout(res.redirect('/login'),2000);    
                
                //next();
               
 });

module.exports=router;
