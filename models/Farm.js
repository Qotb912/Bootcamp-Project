const mongoose = require('mongoose');
const FarmSchema = new mongoose.Schema({
  name:String,
  owner:String,
  //TODO good location data
  location:String,
});
module.exports = mongoose.model('Farm',FarmSchema);