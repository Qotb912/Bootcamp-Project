const mongoose = require('mongoose');
const SmallRabbit = require('./SmallRabbit');
//const RabbitSchema = new mongoose.Schema({
const RabbitSchema = SmallRabbit.extend({
  gender:{
    //M=> male & F=> female
    type:String,
    maxlength:1
  },  
  status:{
    type:mongoose.Schema.ObjectId,
    ref:'Status',    
  },
  disease:{
    type:mongoose.Schema.ObjectId,
    ref:'Disease',    
  },
  cycles:{
    type:mongoose.Schema.ObjectId,
    ref:'CycleLifeTime'
  }
  
}); 

module.exports = mongoose.model('Rabbit',RabbitSchema);