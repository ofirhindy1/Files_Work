const {isEmail} = require('validator')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: 'Email address is required',
    validate: [ isEmail, 'invalid email' ]
  },
   password:{
      type:String,
      // required:true,
      minlength:5
    },
    admin:{
      type:Boolean,
    }
  
  
});
userSchema.statics.findByCredentials = async (email,password) => {

  const user = await User.findOne({email})

  if (!user || password !==user.password) {
      throw new Error("Unable to login")
      
  }

 

  return user;
}
const User = mongoose.model('User', userSchema);

module.exports = User;