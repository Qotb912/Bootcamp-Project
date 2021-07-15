const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please add a name'],
    unique:true,
    trim:true,
    maxlenght:[50,'Name can not be more than 50 characters']
  },
  slug:String,
  description:{
    type:String,
    required:[true,'Please add a description'],
    maxlenght:[500,'Name can not be more than 50 characters']
  },
  website:{
    type:String,
    match:[
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a vaild URL with HTTP or HTTPS'
  ]
  },
  phoneNumber:{
    type:String,
    maxlenght:[20,'Phone Number can not be more than 20 characters']
  },
  email:{
    type:String,
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
    'Please add vaild email'
  ]
  },
  address:{
    type:String,
    required:[true,'Please add an address']  
  },
  location:{
    //GeoJson Point
    type: {
      type: String,
      enum: ['Point'],
      //required: true
    },
    coordinates: {
      type: [Number],
      //required: true,
      index:'2dsphere'
    },
    formattedAddress:String,
    street:String,
    city:String,
    state:String,
    zipcode:String,
    country:String
  },
  careers:{
    type:[String],
    required:true,
    enum:[
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating:{
    type:Number,
    min:[1,'Rating must be at least 1'],
    max:[10,'Rating must can not be more than 10']
  },
  averageCost:Number,
  photo:{
    type:String,
    default:'no-photo.jpg'
  },
  housign:{
    type:Boolean,
    default:false
  },
  jobAssistance:{
    type:Boolean,
    default:false
  },
  jobGuarantee:{
    type:Boolean,
    default:false
  },
  acceptGi:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

//create bootcamp slug from name
BootcampSchema.pre('save',function(next){
  //TODO mongooseModel.pre, && slugify s?
  this.slug = slugify(this.name,{lower:true});
  next();
});

//Geocode && create location field
BootcampSchema.pre('save',async function(next){

  const _location = await geocoder.geocode(this.address);
  this.location = {
    type:'Point',
    coordinates:[_location[0].longitude,_location[0].latitude],
    formattedAddress:_location[0].formattedAddress,
    street:_location[0].streetName,
    city:_location[0].city,
    state:_location[0].stateCode,
    zipcode:_location[0].zipcode,
    country:_location[0].countryCode
  }
  //Don't save address in DB
  this.address=undefined;
  next();
});

module.exports = mongoose.model('Bootcamp',BootcampSchema)