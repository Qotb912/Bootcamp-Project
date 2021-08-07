const { json } = require("express");
const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next)=>{
  //TODO ={ ...err } s?
  let error ={ ...err }
  error.message = err.message;

  //Log consle for dev
  //def betw err.stack & err
  console.log(err);
  //console.log(err.code.red);

  //Mongoose bad Object
  if(err.name === 'CastError'){
    const message = `Resource not found`;
    error = new ErrorResponse(message,404);
  }

  //Mongoose duplicated key
  if(err.code === 11000){
    const message = 'Duplicated field value entered';
    error = new ErrorResponse(message,400);
  }

  //Mongoose validataion errors
  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message);
    console.log(message);
    error=new ErrorResponse(message,400);
  }

  res
  .status(error.statusCode ||500)
  .json({
    success:false,
    error:error.message || 'Server Error'
  });
};

module.exports = errorHandler;