const express = require('express');
const dotenv = require('dotenv');
//const logger =require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');


//Load env var from config/config.env
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body parser "to can read request json data in console"
app.use(express.json());

//Dev logging Middleware
//app.use(logger);
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
  //TODO S?
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(()=>process.exit(1));
});