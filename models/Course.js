const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:[true, 'Please add a course title']
  },
  description:{
    type:String,
    required:[true,'Please add a discription']
  },
  weeks:{
    type:String,
    required:[true,'Please add numbre of weeks']
  },
  tuition:{
    type:Number,
    required:[true,'Please add a tuition cost']
  },
  minimumSkill:{
    type:String,
    required:[true , 'Please add minimum skill'],
    enum:['beginner','intermediate','advanced']
  },
  scholarshipAvailable:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  bootcamp:{
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

//Static method to calc avg of course tuitions
CourseSchema.statics.getAverageCost= async function(bootcampId){
  //console.log('Calculating average cost...'.blue);
  const obj= await this.aggregate([
    {
      $match:{bootcamp:bootcampId}
    },
    {
      $group:{
        _id:'$bootcamp',
        averageCost:{$avg:'$tuition'}
      }
    }
  ]);
  try {
    //TODO this.model('Bootcamp') s?
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
      averageCost:Math.ceil(obj[0].averageCost/10)*10 
    });
  } catch (err) {
    console.log(err,'####');
  }
}

//Call getAverageCost after save
CourseSchema.post('save', function(){
  this.constructor.getAverageCost(this.bootcamp);
});
//Call getAverageCost befor remove
CourseSchema.post('remove', function(){
  this.constructor.getAverageCost(this.bootcamp);
});
module.exports = mongoose.model('Course',CourseSchema);