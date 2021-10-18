const mongoose = require('mongoose');
const StatusSchema = mongoose.Schema({
  rabbit:{
    type:mongoose.Schema.ObjectId,
      ref:'Rabbit',
      required:true
  },
  history:[{
    //S =>subs= احلال & P => prolific = شغالة &  R => rest = استراحة
    status:{
      type:String,
      maxlength:1,
      enum:[
        'S','P','R'
      ]
    },
    reason:{
      type:String
    }
  }],
});

module.exports = mongoose.model('Status',StatusSchema);