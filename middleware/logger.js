// @desc Losgs request to console
//TODO: write a good logger
const logger = (req,res,next)=>{
  
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

module.exports = logger;