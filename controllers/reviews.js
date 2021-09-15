const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review =require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc   Get all reviews
// @route  GET /api/v1/reviews
// @route  GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req,res,next)=>{
 
  if(req.params.bootcampId){
    const reviews= await Review.find({bootcamp:req.params.bootcampId});
    res
      .status(200)
      .json({
        success:true,
        count:reviews.length,
        data:reviews
      });
  }else{
    res
    .status(200)
    .json(res.advancedResults);  
  }
});


// @desc   Get single review
// @route  GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req,res,next)=>{
  //TODO findById().populate s?
  const review = await Review.findById(req.params.id).populate({
    path:'bootcamp',
    select:'name description'
  });
  if(!review){
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`,404));
  }
  res
    .status(200)
    .json({
      success:true,
      data:review
    });

});



// @desc   Add review
// @route  POST /api/v1/bootcamp/:bootcampId/reviews
// @access Private
exports.addReview = asyncHandler(async (req,res,next)=>{
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  //check bootcamp if exist
  if(!bootcamp){
    return next(new ErrorResponse(`No bootcamp found with id of ${req.params.bootcampId}`,400));
  }
  ////Mack sure the logged in user is the owner
 // if(req.user.id !==bootcamp.user.toString() )
  req.body.user = req.user.id;
  req.body.bootcamp = req.params.bootcampId;
  const review = await Review.create(req.body);

  res
    .status(201)
    .json({
      success:true,
      data:review
    });

});

// @desc   Update review
// @route  PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async (req,res,next)=>{
  let review = await Review.findById(req.params.id);
  //check bootcamp if exist
  if(!review){
    return next(new ErrorResponse(`No review found with id of ${req.params.id}`,400));
  }
  //Mack sure the logged in user is the owner
  if(review.user.toString() !== req.user.id  && req.user.role !== 'admin'){
    return next(new ErrorResponse(`User  is not authorized to update review ${review._id}`,401));
  }
  review = await Review.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });

  res
    .status(200)
    .json({
      success:true,
      data:review
    });

});

// @desc   Delete review
// @route  DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req,res,next)=>{
  let review = await Review.findById(req.params.id);
  //check bootcamp if exist
  if(!review){
    return next(new ErrorResponse(`No review found with id of ${req.params.id}`,400));
  }
  //Mack sure the logged in user is the owner
  if(review.user.toString() !== req.user.id  && req.user.role !== 'admin'){
    return next(new ErrorResponse(`User  is not authorized to update review ${review._id}`,401));
  }
  await review.remove();
  res
    .status(200)
    .json({
      success:true,
      data:{}
    });

});