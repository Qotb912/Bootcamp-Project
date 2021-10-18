const mongoose = require('mongoose');
const AlertCycleLifeTimeSchema = mongoose.Schema({
  alerts:{
    type:[{
    date:Date,
    done:Boolean,
    data:String
  }],
/**
   * index 0 => Alert for pollination after 10 days from last birth date 
   * index 1 => Alert for First check after 10 days from actual date for pollination
   * index 2 => Alert for Second check after 15 days from actual date for pollination
   * index 3 => Alert for Final check after 25 days from actual date && attach the box
   * index 4 => Alert for expected birth date after 30 days from actual date for pollination
   * index 5 => Alert for next pollination for next cycle after 10 days from actual date for birth date
   * index 6 => Alert for out children  from box after 14 days from actual date for birth date
   * index 7 => Alert for weaning the children  from box after 30 days from actual date for birth date
   */
  validate: [alertArrayLimit, 'exceeds the limit of 8']
}
});

function alertArrayLimit(len){
  return  len.length <= 8;
}
AlertCycleLifeTimeSchema= mongoose.model('AlertCycleLifeTimeSchema',AlertCycleLifeTimeSchema);


module.exports = {AlertCycleLifeTimeSchema}