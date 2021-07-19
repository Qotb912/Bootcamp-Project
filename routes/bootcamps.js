const express = require('express');
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampUploadPhoto }=require('../controllers/bootcamps');

  // import models  
  const Bootcamp = require('../models/Bootcamp');
  // import advancedResults
  const advancedResults = require('../middleware/advancedResults');

//Include other ressourse routers
const courseRouter = require('./courses');

const router = express.Router();

//Re-route into other ressourse router
router
  .use('/:bootcampId/courses',courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp,'courses'), getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);
router
  .route('/:id/photo')
  .put(bootcampUploadPhoto);

module.exports = router;