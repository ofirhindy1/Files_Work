const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  
  fileName: {
    type: String,
    trim: true,
    lowercase: true,
    required:true
    // unique: true,
  },
  filePath:{
    type:String,
    required:true,
  },
  belonging:{
    required:true,
    type:String
  },
   dateAdded:{
      type:String,
      default: Date()
    }
  
  
});

const File = mongoose.model('File', fileSchema);

module.exports = File;