const express = require('express');
const dotenv = require('dotenv');
//const logger =require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env var from config/config.env
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');  
const users = require('./routes/users');  
const reviews = require('./routes/reviews');  
const { sanitize } = require('express-mongo-sanitize');

const app = express();

//Body parser "to can read request json data in console"
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging Middleware
//app.use(logger);
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//Sanitize data
app.use(mongoSanitize());
//Set security headers
app.use(helmet());
//Prevent XSS attacks
app.use(xssClean());
//Rate limiting
const limiter = rateLimit({
  windowMs:10 * 60 * 1000,//10 mins
  max:100
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//File uploading
app.use(fileupload());
//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Mount routers
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses);
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/reviews',reviews);

//use to catch error 
//need to be after mount routers to can catch error after that 
//TODOS?
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
  //TODO S?
  // console.log(err.name);
  // console.log(err.code);
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(()=>process.exit(1));
});