const mongoose = require('mongoose');
const PollinationSchema = mongoose.Schema({
  temperature:{
    type:String,
    required:true
  },
  humidity:{
    //الرطوبة
    type:String,
    required:true
  },
  mId:{
    //requie for    
     type:mongoose.Schema.ObjectId,
     ref:'Rabbit',
     required:true
   },
   from:[{
     dId:{
       type:mongoose.Schema.ObjectId,
       ref:'Rabbit',
       required:true
      },
      number:{
        type:Number,
        required:true
      },
    }],
    expectedDate:{
      type:Date
    },
    actualDate:{
      type:Date
    },
  /**
   * index 0 => First check after 10 days from actual date 
   * index 1 => Second check after 15 days from actual date 
   * index 2 => Final check after 25 days from actual date =الوقت لتركيب البيت
   */
   Check:{
    type:[{
      data:Date,
      result:Boolean,
      notes:String
    }],
   validate: [checkArrayLimit, 'exceeds the limit of 3']
  },
});
/**
 * return true if len <= 3
 * @param {length of check array:number} val 
 * @returns true
 */
function checkArrayLimit(len){
  return  len.length <= 3;
}
module.exports = mongoose.model('Pollination',PollinationSchema);
