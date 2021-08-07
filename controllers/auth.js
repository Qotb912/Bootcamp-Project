const User =require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { response } = require('express');

// @desc    Register user
// @route   POST api/v1/auth/register
// @access  Public 
exports.register = asyncHandler(async (req,res,next)=>{
  const {name , email , password,role}= req.body;
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  sendTokenResponse(user,200,res);
});  



// @desc    Login user
// @route   POST api/v1/auth/login
// @access  Public 
exports.login = asyncHandler(async (req,res,next)=>{
  const {email , password}= req.body;
  //Validate email & password
  if(!email || !password){
    return next(new ErrorResponse('Please provide an email and password',400));
  }
  //Check if user in db
  //TODO need to check mail is vaild or not (correct email or not)
  const user = await User.findOne({email}).select('+password');
  if(!user){
    return next(new ErrorResponse('Invalid credentials',401));
  }
  //Check if password match
  const isMatch = await user.matchPassword(password);
  if(!isMatch){
    return next(new ErrorResponse('Invalid credentials',401));
  }
  sendTokenResponse(user,200,res);
});

// @desc    Get current logged in user
// @route   POST api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.user.id);
  res
    .status(200)
    .json({
      success:true,
      data:user
    });
}); 

// @desc    Log user out / clear cookie
// @route   GET api/v1/auth/loggout
// @access  Private
exports.loggout = asyncHandler(async (req,res,next)=>{
  res.cookie('token','none',{
    expires: new Date(Date.now()+10*1000),
    httpOnly:true
  })
    res
    .status(200)
    .json({
      success:true,
      data:{}
    });
}); 


exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});


// @desc    Update user details
// @route   PUT api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req,res,next)=>{
  const fieldsToUpdate = {
    name:req.body.name,
    email:req.body.email
  }
  const user = await User.findByIdAndUpdate(req.user.id , fieldsToUpdate ,{
    new:true,
    runValidators:true  
  });
  res
    .status(200)
    .json({
      success:true,
      data:user
    });
}); 

// @desc    Update password
// @route   PUT api/v1/auth/updatepassword
// @access  Private
exports.updatepassword = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.user.id).select('+password');
  //Check current password
  if(!(await user.matchPassword(req.body.currentPassword))){
    return next(new ErrorResponse('Password is incorrect',401));
  }
  user.password = req.body.newPassword;
  await user.save();
  
  sendTokenResponse(user,200,res);
}); 



/*
// // TODO not finished v 5, 6 pass
// // @desc    Forgot password
// // @route   POST api/v1/auth/forgotpassword
// // @access  Public
// exports.forgotpassword = asyncHandler(async (req,res,next)=>{
//   const user = await User.findOne({email:req.body.email});
//   if(!user){
//     return next(new ErrorResponse('There is no user with that email',404));
//   }
//   //Get reset password token
//   const resetToken = user.getResetPasswordToken();
//   //save in db
//   await user.save({validateBeforeSave:false});
//   //Create reset url 
//   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
//   const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`;

  
//   //TODO uncommint this try catch when you solve err in sendEmail fun
//   //try {
//     console.log('run sendEmail fun'.green);
//     await sendEmail({
//       email:user.email,
//       subject:'Password reset token',
//       message 
//     });
//     console.log('finish sendEmail fun'.green);

//     res.status(200).json({success:true,data:'Email sent'});
//   // } catch (err) {
//   //   console.log(err);
//   //   user.resetPasswordToken = undefined;
//   //   user.resetPasswordExpire = undefined;
//   //   await user.save({validateBeforeSave:false});
//   //   return next(new ErrorResponse('Email could not be sent',500));
//   // }

//   // res
//   //   .status(200)
//   //   .json({
//   //     success:true,
//   //     data:user
//   //   });
// }); 
*/

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(`resettoken_in_Auth-Controllers_ forgotPassword-Fun: ${resetToken}`);
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;

    // await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});



//Get token from model , create cookie and send res
const sendTokenResponse = (user , statusCode , res)=>{
  //create token
  const token = user.getSignedJwtToken();
  //option for cookie
  const options ={
    httpOnly:true,
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 *1000)
  };

  if(process.env.NODE_ENV === 'production'){
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
      success:true,
      token
    });

};

