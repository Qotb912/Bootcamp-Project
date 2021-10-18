const mongoose = require('mongoose');
const CellSchema = mongoose.Schema({
  Position:{
    cellNumbere:{
      type:String,
      required:true,
      maxlength:1,
    },
    cageNumber:{
      type:String,
      required:true,
      maxlength:3
    },
    productionLine:{
      type:String,
      required:true,
      maxlength:2
    }, 
    warehouse:{
      type:String,
      required:true,
      maxlength:3
    },
  }
});

module.exports = mongoose.model.apply('Cell',CellSchema);