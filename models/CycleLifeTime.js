const mongoose = require('mongoose');
const CycleLifeTimeSchema = mongoose.Schema({
  //الدورة لاي ام
  alert:{
    type:mongoose.Schema.ObjectId,
    ref:'AlertCycleLifeTimeSchema'
  },
  pollination:{
    type:mongoose.Schema.ObjectId,
    ref:'Pollination'
  },
  BirthProcess:{
    type:mongoose.Schema.ObjectId,
    ref:'BirthProcess'
  },
  dateOutOfBox:{
    type:Date,
  },
  dateOfWeaning:[{
    date:{
      type:Date,
      required:true
    },
    cellId:{
      type:mongoose.Schema.ObjectId,  
      required:true,
      ref:'Cell'
    },
    totalNumber:{
      type:Number,
      required:true
    },
    totalWeight:{
      type:Double,
      required:true
    },
    notes:String
  }],

  //TODO لو امكن list avalible to pollination بعد 10 من الولادة تدخل 
 
});

module.exports = mongoose.model('CycleLifeTime',CycleLifeTimeSchema);
