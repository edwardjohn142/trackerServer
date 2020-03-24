const router = require('express').Router();
// const User = require('./../model/users'); mongodb
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const users = [
  {
    id:1,
    username:"user1",
    password:"123456",
    token:''

  },{
    id:2,
    username:"user2",
    password:"123456",
    token:''

  },{
    id:3,
    username:"user3",
    password:"123456",
    token:''

  },{
    id:4,
    username:"user4",
    password:"123456",
    token:''

  },{
    id:5,
    username:"user5",
    password:"123456",
    token:''

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
      res.sendStatus(403).json("token is invalid");
    } else {
      
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


router.route('/auth').post((req,res) => {
// ***** this is only for testing. no database connection yet *****
  users.forEach((user,index) => {
    if(user.username == req.body.username && user.password == req.body.password){
      jwt.sign({user:user}, 'secretkey', (err, token) => {    
        if(err){
          res.status(403).json("Invalid username or password")
        }
        users[index].token = token; 
        console.log(users[index]);
        
        res.json({
          token:token,
          id:user.id,
          status:200,
          success:true
        });
      });
      return false;
    }
  });



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

router.route('/add').post((req, res) => {
  console.log(req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;

  const newUser = new User({username,password,latitude,longtitude});
  console.log(newUser);
  
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.json('Error: ' + err));
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