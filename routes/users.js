const router = require('express').Router();
let User = require('./../model/users');



router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update-location/:id').post((req,res) => {

  User.findById(req.params.id).then(user => {
    user.username = req.body.username;
    user.description = req.body.description;
    user.latitude = req.body.latitude;
    user.longtitude = req.body.longtitude;

    user.save()
    .then(()=>res.json({success:true}))
    .catch(err => res.json({success:false}))
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/auth').post((req,res) => {
  console.log(req.body);
  
  User.find({username:req.body.username,password:req.body.password})
  .then(users =>{console.log(users);
   res.json(users)})
  .catch(err => res.status(400).json('Error: ' + err));
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

module.exports = router;