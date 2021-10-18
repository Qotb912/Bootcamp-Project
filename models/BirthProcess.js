const mongoose = require('mongoose');
const BirthProcessSchema = mongoose.Schema({
  //TODOبكده states تعمل انها لو لسة مجاش وقتها تمام لو جه يبقي لازم تتملي وتعمل 
  mId:{
    type:mongoose.Schema.ObjectId,
    required:true
  },
  numberOfAlive:{
    type:Number,
    required:true
  },
  totalNumber:{
    type:Number,
    required:true
  },
  actualDate:{
    type:Date
  },
  expectedDate:{
    type:Date
  },
  temperature:{
    type:String,
    required:true
  },
  humidity:{
    //الرطوبة
    type:String,
    required:true
  },
  notes:String,
  //TODO الطلق و الجرعة و كام مرة
  //TODO وزن الام و حالتها
  //TODO وزن العيال او حالتهم
  //TODO  (نعملها لكل ارنب وكده)الادوية بعد الولادة


});

module.exports = mongoose.model('BirthProcess',BirthProcessSchema);
