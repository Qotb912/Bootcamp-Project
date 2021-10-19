const User = require('./User')
const DeliverySchema = User.extend({
  //TODO traking data && car data

});

module.exports = mongoose.model('Delivery',DeliverySchema);
