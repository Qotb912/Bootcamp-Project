const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
  
const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please add a name']
  },
  email:{
    type:String,
    required:[true,'Please add an email'],
    unique:true, 
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
    'Please add vaild email'
  ]
  },
  role:{
    type:String,
    enum:['user','publisher'],
    default:'user'
  },
  password:{
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

//Encrypt password using bcrybt
UserSchema.pre('save',async function(next){
  // check if forget password used
  //TODO  for all s?
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password  = await bcrypt.hash(this.password,salt);
});
//Sign JWT and return 
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{ 
    expiresIn:process.env.JWT_EXPIRE
  });  
};
//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enterdPassword){
  return await bcrypt.compare(enterdPassword , this.password);
}

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function(){
  //Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  console.log(`resetToken_in_User-Model_getResetPasswordToken-Fun: ${resetToken}`);
  //Hash token and set to resetPasswordToken field
  //TODO for all of this s? 
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log(`resetPasswoedToken_in_User-Model_getResetPasswordToken-Fun: ${this.resetPasswordToken}`);
  
  //Set Expire
  //TODO when call now() and now what is the diff betw this and one in createAt in model
  this.resetPasswordExpire = Date.now() + 10 * 60 *1000;
  return resetToken ;
}

module.exports =mongoose.model('User',UserSchema);