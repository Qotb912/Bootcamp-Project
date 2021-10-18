const mongoose = require('mongoose');
const SmallRabbitSchema = mongoose.Schema({
  
  id:{
    type:String,
    //TODO AutoGenrated
    //TODO get this id is the mongoose schema id
  },
  cellId:{
    type:mongoose.Schema.ObjectId,
    require:true,
    ref:'Cell'
  },
  owner:{
    // صاحب المزرعة
    require:true
  },
  farm:{
    type:mongoose.Schema.ObjectId,
    require:false
  },
  mId:{
    //requie for    
     type:mongoose.Schema.ObjectId,
     ref:'Rabbit',
     require:false
   },
  dId:{
     type:mongoose.Schema.ObjectId,
     ref:'Rabbit',
     require:false
   },
  cycleLifeTimeId:{
    type:mongoose.Schema.ObjectId,
    ref:'CycleLifeTime'
  },
  dateOfWeaning:{
    type:Date    
  },

});


module.exports = mongoose.model('SmallRabbit',SmallRabbitSchema);