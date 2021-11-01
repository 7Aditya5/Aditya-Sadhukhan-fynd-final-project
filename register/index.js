const express=require('express');
let router = express.Router();
const path = require('path');
const mailing=require('./mail');
const mongoose=require('mongoose');
const {Usermodel,Candidatemodel,RegisteredCitizenmodel}=require(path.join(path.dirname(__dirname),'/model/model.js'));
const crypto = require('crypto');



router.get('/',(req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    console.log();
    res.sendFile(path.dirname(__dirname) + '/static/register.html');

  });

router.post('/',async function(req,res,next){
   
              if(req.body.voter_name.length>5 && req.body.personal_ID.length===10)
              {
                   
                   let citizen= await RegisteredCitizenmodel.findOne({ personal_id: req.body.personal_ID , name:req.body.voter_name});
                   
                   //console.log(citizen);

                   
                      if(citizen!==null){
                        let user = await Usermodel.findOne({ email:citizen.email});
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
                 
                    mailing.sendmail(tendigitrandomnumber,ans,citizen.email);

                    let userdata={
                      email:citizen.email,
                      voter_id: tendigitrandomnumber,
                      password:pass,
                      name: citizen.name
                    }
                      console.log(userdata);
                   
                          // Insert the new user if they do not exist yet
                          user = new Usermodel(userdata);
                           user.save();
                          
                          console.log("user added");
                         res.status(200).send("use credentials sent in your registered mail to login  click here to <a href='/login'> login </a>");
                       
                        }
                      }
                      else{
                        res.send('not a  citizen of the country');
                      }
                          
              }
              else{
                return res.status(400).send(`invalid credentials`);
              }

                
               
 });

module.exports=router;
