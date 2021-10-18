const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please add a name']
  }
  ,password:{
    type:String,
    required:[true,'Please add a password'],
    minlength:[6, 'Password can\'t be less than 6 characters'],
    //you can't select it from db 
    select:false
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
  createdAt:{
    type:Date,
    defult:Date.now
  }
});