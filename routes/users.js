const router = require('express').Router();
// const User = require('./../model/users'); mongodb
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const users = [
  {
    id:1,
    username:"user1",
    password:"123456",
    token:'',
    activated:false,
    status:1

  },{
    id:2,
    username:"user2",
    password:"123456",
    token:'',
    activated:false,
    status:1

  },{
    id:3,
    username:"user3",
    password:"123456",
    token:'',
    activated:false,
    status:1

  },{
    id:4,
    username:"user4",
    password:"123456",
    token:'',
    activated:false,
    status:1

  },{
    id:5,
    username:"user5",
    password:"123456",
    token:'',
    activated:false,
    status:1
  },
  
]

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tracker'
});

mc.connect((err) => {
  if(err){
      console.log('Error connecting to Db');
      return;
  }
  console.log('Connection established');
});



router.route('/').post(verifyToken,(req, res) => {
  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    
    if(err) {
      res.status(403).json({message:"token is invalid",status:403});
    }else if(authData.user != req.token){
      res.status(403).json({message:"token is invalid",status:403});
    } 
    
    else {
      
// ***** this is only for testing. no database connection yet *****
      users.forEach(user =>{
        if(user.token == req.token){
          res.json({
            user:user,
            status:200,
            success:true
          });
          return false;
        }
      });
      // mc.query('SELECT * FROM user', (err,rows) => {
      //   if(err) throw err;
      //   return res.json(rows);
      // });
    }
  });
  

});


router.route('/auth').post((req,res,next) => {
// ***** this is only for testing. no database connection yet *****
 var counter = 0;
 console.log(req.body);
 
  users.forEach((user,index) => {
    
    if(user.username == req.body.username && user.password == req.body.password){
      counter +=1;
      if(user.status != 2){
        
        jwt.sign({user:user}, 'secretkey', (err, token) => {    
          if(err){
            res.status(404).json("Server Error!")
          }
          users[index].token = token; 
          
          res.json({
            user:users[index],
            status:200,
            success:true
          });
        });
        return false;
      }else{
        res.status(403).json("Rider is not authorized to use this application.");
        return false;
      }
    }
  });
    
  if(counter == 0){
    res.status(401).json({message:" Rider username or password is invalid!",success:false})
  }


  // mc.query('SELECT * FROM user where username = ? and password = ?',[req.body.username,req.body.password]	, (err,rows) => {
  //   if(err) throw err => res.status(400).json({message:'Error: ' + err, success:false});
  //   if(rows.length <= 0){
  //     res.status(403).json("Invalid username or password")
  //   }else{
  //     jwt.sign({user:rows[0]}, 'secretkey', (err, token) => {        
  //       res.json({
  //         token:token,
  //         status:200,
  //         success:true
  //       });
  //     });
  //   }
  // });


})


router.route('/active_account').post(verifyToken,(req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json("token is invalid");
    } else {
      

      
// ***** this is only for testing. no database connection yet *****
      users.forEach((user,index) =>{
       
        
        if(user.token == req.token){
          console.log(req.body);
          users[index].password = req.body.password
          users[index].activated = true
          res.json({
            user:user,
            status:200,
            success:true
          });
          console.log(users[index]);
          return false;
        }
      });
      // mc.query('SELECT * FROM user', (err,rows) => {
      //   if(err) throw err;
      //   return res.json(rows);
      // });
    }
  });
});




function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}
module.exports = router;