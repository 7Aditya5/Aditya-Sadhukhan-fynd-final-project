const express=require('express');
let router = express.Router();
const path = require('path');
const mongoose=require('mongoose');
const {Usermodel,Candidatemodel}=require(path.join(path.dirname(__dirname),'/model/model.js'));



router.post('/',async (req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    console.log(req.body);
    console.log(req.session.user);
    if(req.session.user!==undefined && req.body.candidate){
      await Usermodel.updateOne({ voter_id: req.session.user.voterid},{$set:{voted:true}});
      await Candidatemodel.updateOne({candidate_name: req.body.candidate},{$inc:{no_of_votes: 1}});
      delete req.session.user;
      req.session.destroy();
      res.send('thank you for voting');
    }
    else{
      res.redirect('/login');
    }
    
        

    
  });





module.exports=router;