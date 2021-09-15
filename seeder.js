//TODO fs s?
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Lod env var 
dotenv.config({path:'./config/config.env'});

//Load Model
//ex: const Bootcamp =require('./models/Bootcamp');

const connectDB = require('./config/db');
const { json } = require('express');

//connect to DB
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
});

//Read JSON files
//ex: const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));


//Import into DB
const importData = async ()=>{
  try {
   // await module.create(json files);
   //ex: await Bootcamp.create(bootcamps);
   
    console.log('Data Impoted... '.green.inverse);
    // process.exit();  and it's kind to s?
    process.exit();
  } catch (err) {
    console.error(err);
  }
}


//Delete into DB
const deleteData = async ()=>{
  try {
    //ex: await Bootcamp.deleteMany();
    console.log('Data Destroyed... '.red.inverse);
    // process.exit();  and it's kind to s?
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

//to run this we write in terminal node seeder -i --> -i = index 2 in argv so it will run importData() fun
// else node seeder -d it will run  deleteDate() fun
if(process.argv[2] === '-i'){
  importData();
}else if(process.argv[2] === '-d'){
  deleteData();
}