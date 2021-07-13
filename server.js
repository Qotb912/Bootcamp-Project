const express = require('express');
const dotenv = require('dotenv');

//Load env var from config/config.env

dotenv.config({path:'./config/config.env'});

const app = express();

app.get('/api/v1/bootcamps',(req,res)=> {
  //res.send({name:"Coma"}); it change content-type automtic
  res.status(200).json({success:true , msg:'Show all bootcamps'});
});

app.post('/api/v1/bootcamps',(req,res)=> {
  res.status(201).json({success:true , msg:'Create new bootcamp'});
});

app.get('/api/v1/bootcamps/:id',(req,res)=> {
  res.status(201).json({success:true , msg:`Show bootcamp ${req.params.id}`});
});


app.put('/api/v1/bootcamps/:id',(req,res)=> {
  res.status(201).json({success:true , msg:`Update bootcamp ${req.params.id}`});
});

app.delete('/api/v1/bootcamps/:id',(req,res)=> {
  res.status(201).json({success:true , msg:`Delete bootcamp ${req.params.id}`});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));