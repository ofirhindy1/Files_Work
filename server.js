const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
require('./db/mongooseConnect')
const usersRouter = require('./routres/user');
const filesRouter = require('./routres/files');
const cors = require('cors')
const jwt =require('jsonwebtoken')
const User = require('./models/user')
const File = require('./models/file')

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(cors())
app.use(fileUpload());
app.use(filesRouter);   
app.use(usersRouter);   
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));


app.post('/login', async (req, res) => {
    try{
    const user = await User.findByCredentials(req.body.data.email,req.body.data.password)
    jwt.sign({user},process.env.SECRET,{expiresIn:'10 hours'},(err,token)=>{
      res.send({user,
        token
      })
    })
    
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }

    });
  

app.listen(5000, () => console.log('Server Started...'));