const Bootcamp = require('../models/Bootcamp');
const BootCamp =require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler( async (req,res,next)=>{
   const bootcamps = await BootCamp.find();
   res
   .status(200)
   .json({
     success:true,
     count:bootcamps.length,
     data:bootcamps
   });

});

// @desc   Get single bootcamp
// @route  GET /api/v1/bootcamp/:id
// @access Public
exports.getBootcamp =asyncHandler( async (req,res,next)=>{
 
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      //if not in db
      return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404));
    }
    res
    .status(200)
    .json({
      success:true,
      data:bootcamp
    });


 
});

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler( async (req,res,next)=>{
 
   console.log(req.body);
   const bootcamp = await BootCamp.create(req.body);
   res
   .status(201)
   .json({success:true 
    ,data:bootcamp
  });
});


// @desc   Update  bootcamp
// @route  PUT /api/v1/bootcamp/:id
// @access Private
exports.updateBootcamp =asyncHandler( async (req,res,next)=>{
 
   const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
   
   if(!bootcamp){
    return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404));
    }
    
    res
    .status(200)
    .json({success:true , data:bootcamp}); 
  
});


// @desc   Delete  bootcamp
// @route  DELETE /api/v1/bootcamp/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async  (req,res,next)=>{
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
      return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404));
    }
    res
      .status(200)
      .json({success:true , data:bootcamp});
 
});