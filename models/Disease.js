const mongoose = require('mongoose');
const DiseaseSchema = mongoose.Schema({
  rabbit:{
    type:mongoose.Schema.ObjectId,
      ref:'Rabbit',
      required:true
  },
  history:[{
    type:String,
    required:true,
  }],
});


module.exports = mongoose.model('Disease',DiseaseSchema);