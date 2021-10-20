const User = require('./User')
const FarmhandSchema = User.extend({
  farmid:{
    type:mongoose.Schema.ObjectId,
    ref:'Farm',
    //TODO think in m
    required:[true,'Please you have to add farm id']
  }
});

module.exports = mongoose.model('Farmhand',FarmhandSchema);
