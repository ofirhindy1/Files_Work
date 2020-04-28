const router = require('express').Router();
let User = require('../models/user');
const jwt = require('jsonwebtoken')
var jwtDecode = require('jwt-decode');


function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1]
      req.token = bearerToken;
      next();
  }
}
router.get('/user' ,verifyToken,(req, res) => {
jwt.verify(req.token, process.env.SECRET, (err,authData)=>{
  var decoded = jwtDecode(req.token);
console.log(decoded);
  if(err){
    res.status(403).send(err)
}
else{
    
  User.find()
  .then(users => res.send(decoded))
    // res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
}
})
  
});
router.post('/add', (req,res)=>{
  const user = new User(req.body)
  user.save().then(()=>{

    res.status(200).send(user)


}).catch((e)=>{
    res.status(401).send(e)
})
})


module.exports = router;