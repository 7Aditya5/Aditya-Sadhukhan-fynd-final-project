const express=require('express');
let router = express.Router();
const path = require('path');
const mongoose=require('mongoose');
const crypto = require('crypto');
//console.log(path.dirname(__dirname));
const {Usermodel,Candidatemodel}=require(path.join(path.dirname(__dirname),'/model/model.js'));



router.get('/',(req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    res.sendFile(path.dirname(__dirname) + '/static/login.html');
  });


  router.post('/',async function(req,res,next){

    if(req.body.voter_id && req.body.password){

                          let pass=crypto.pbkdf2Sync(req.body.password, '10',  
                                              1000, 64, `sha512`).toString(`hex`); 

                      let voter= await Usermodel.findOne({ voter_id: req.body.voter_id ,password: pass});

                      /* if (!req.body.voter_id || !req.body.password) {
                        res.send('login failed');    
                      } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
                        req.session.user = "amy";
                        req.session.admin = true;
                        res.send("login success!");
                      }*/

                      //console.log(voter);

                      if(voter){
                      // console.log(req.body.voter_id, req.body.password);
                        //res.send('you are logged in');
                        //req.session.user = "req.body.voter_id";
                              if(voter.voted==false){
                                req.session.user = {
                                  voterid: voter.voter_id, 
                                  name:   voter.name
                              };
                                req.method='get'
                                req.path='/vote'
                                next();
                              }
                            else{
                                res.status(400).send('you have already voted');
                            }
                          }
                     else{
                          res.status(400).send('invalid login');
                    }
                        
    }
    //res.redirect('/vote');
  });



module.exports=router;