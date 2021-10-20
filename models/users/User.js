const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please add a name']
  },

  nationalId:{
    type:String,
    required:[true,'Please add a national id']
  },
  mobile: {
    type:[String],
    validate:[mobileArrayLimit,'You have to enter at least one and max two']
    
  },
  password:{
    type:String,
    required:[true,'Please add a password'],
    minlength:[6, 'Password can\'t be less than 6 characters'],
    //you can't select it from db 
    select:false
  },
  //TODO add sponsers role
  role:{
    type:String,
    enum:['owner','Farmhand','doctor','supervisor','trader','inspector','delivery'],
    //موصل الطلبات (في عمليات البيع),مراقب (لعمليات البيع),تاجر,مشرف (للمزرعة),دكتور,عامل ,صاحب المزرعة ,
    default:'user'
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
  createdAt:{
    type:Date,
    defult:Date.now
  }
});

function mobileArrayLimit(len){
  return (1 <= len <=2) ;  
}

module.exports = mongoose.model('User',UserSchema);