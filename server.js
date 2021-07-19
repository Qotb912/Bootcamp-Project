const express = require('express');
const dotenv = require('dotenv');
//const logger =require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env var from config/config.env
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//Body parser "to can read request json data in console"
app.use(express.json());

//Dev logging Middleware
//app.use(logger);
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//File uploading
app.use(fileupload());
//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Mount routers
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);

//use to catch error 
//need to be after mount routers to can catch error after that 
//TODOS?
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
  //TODO S?
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(()=>process.exit(1));
});