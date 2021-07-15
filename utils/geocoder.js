const NodeGeocoder = require('node-geocoder');


//TODO  options s?
const options = {
  provider:process.env.GEOCODER_PROVIDER,
  //TODO httpAdater s?
  httpAdater:'https',
  apiKey:process.env.GEOCODER_API_KEY,
  formatter:null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder ;