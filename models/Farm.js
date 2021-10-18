const mongoose = require('mongoose');
const FarmSchema = new mongoose.Schema({
  //TODO make good id
  id:String,
  owner:String,
  location:String,
});
module.exports = mongoose.model('Farm',FarmSchema);