const express = require('express');
const { 
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatepassword,
  loggout } = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();
 
router
  .route('/register')
  .post(register);

router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/loggout',protect,loggout);
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword/:resettoken',resetPassword);
router.put('/updatedetails',protect,updateDetails);
router.put('/updatepassword', protect, updatepassword);
module.exports = router; 
