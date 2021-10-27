const express=require('express');
let router = express.Router();
const path = require('path');
const mongoose=require('mongoose');
const {Usermodel,Candidatemodel}=require(path.join(path.dirname(__dirname),'/model/model.js'));



//console.log(path.dirname(__dirname));


router.get('/',(req, res) => {
    //res.sendFile(__dirname + '/static/home.html');
    //res.sendFile(path.dirname(__dirname) + '/static/vote.html');
    console.log(JSON.parse(req.session.user.voterid));
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit vote here</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <style>
        div {
          
          padding: 50px;
          border: 1px solid;
          margin: 0;
        }
        button{
            margin:auto;
            display:block;
            border-radius: 10%;
            background-color: rgb(72, 72, 230);
            color: white;
            text-align: center;
            padding: 10px;
            width:30%;
        }
        </style>
</head>
<body>
<header>Hello <b>voterID: ${(req.session.user.voterid)} Name: ${(req.session.user.name)}</b> </header>
    <form action="/logout" method="post" id="form1">
        <div class="container-fluid">
            <div class="row">
            <div class="col-lg-4">
                <img src="https://res.cloudinary.com/dblrui5lh/image/upload/v1635236002/candidates/mamata_vz8jbt.jpg" width="310" height="263" alt="mamata">
                <input type="radio" id="mamata" name="candidate" value="Mamata Banerjee" required>
                <label for="mamata">Mamata Banerjee</label><br>
            </div>
            <div class="col-lg-4">
                <img src="https://res.cloudinary.com/dblrui5lh/image/upload/v1635235991/candidates/modi_vthiqe.jpg" width="310" height="263" alt="modi">
                <input type="radio" id="modi" name="candidate" value="Narendra Modi" required>
                <label for="modi">Narendra Modi</label><br>
            </div>
             <div class="col-lg-4">
                <img src="https://res.cloudinary.com/dblrui5lh/image/upload/v1635235996/candidates/thackrey_rf4crd.jpg" width="310" height="263" alt="thackrey">
                <input type="radio" id="thackrey" name="candidate" value="Bal Thackrey" required>
                <label for="thackrey">Bal Thackrey</label><br>
            </div>    
    </form>
            </div>
            <button type="submit" value="Submit" form="form1">Submit</button>
            </div> 
</body>
</html>`)
  });

router.post('/',(req,res)=>{
  console.log(req.body);
  //res.send('ok received');
  
  //setTimeout(res.redirect('/login'),2000);    
  res.send("received vote");
  //next();
});

module.exports=router;