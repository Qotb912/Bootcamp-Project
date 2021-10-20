const User = require('./User')
const TraderSchema = User.extend({
  //TODO payment data
});

module.exports = mongoose.model('Trader',TraderSchema);
