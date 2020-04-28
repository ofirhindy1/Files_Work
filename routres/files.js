const router = require('express').Router();
let File = require('../models/file');
const jwt = require('jsonwebtoken')
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next();
    }
}
router.get('/files',(req,res)=>{

    File.find()
    .then(files => res.json(files))
    .catch(err => res.status(400).json('Error: ' + err));
    
})

router.post('/upload/file', (req,res)=>{
    console.log("tets")
    let newDate = new Date()
      console.log(req.body.fileName)
      const file = new File (req.body)
      console.log(file)
      file.save().then(()=>{
          res.status(300).send(file)
      }).catch((e)=>{
          res.status(401).send(e)
      })
  })
  router.post('/upload', async (req, res) => {
    console.log(req)
    console.log(req.headers.belonging)
    const belonging = req.headers.belonging
    const fileName = req.headers.filename 
    console.log(fileName)
    filePath = `${__dirname}/client/public/uploads/${req.files.file.name}`
    const fileToDb = await new File ({fileName,filePath,belonging})

  
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;
    
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        fileToDb.save().then(()=>{
        }).catch((e)=>{

        })
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
    
  });


module.exports = router;