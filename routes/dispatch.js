const fs = require('fs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');



router.route('/').post(verifyToken,(req, res) => {



  // ***** this is only for testing. no database connection yet *****
        let rawdata = fs.readFileSync('./json/dispatch.json');
        let jobs = JSON.parse(rawdata);
        res.json({status:200,datas:jobs});
      
  
    
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
  module.exports = router