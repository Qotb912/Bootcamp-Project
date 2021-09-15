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
const reviewRouter = require('./reviews');

const router = express.Router();
const {protect,authorize} = require('../middleware/auth');

//Re-route into other ressourse router
router
  .use('/:bootcampId/courses',courseRouter);
router
  .use('/:bootcampId/reviews',reviewRouter);


router
  .route('/')
  .get(advancedResults(Bootcamp,'courses'), getBootcamps)
  .post(protect, authorize('publisher','admin'), createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher','admin'), updateBootcamp)
  .delete(protect, authorize('publisher','admin'), deleteBootcamp);
router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher','admin'), bootcampUploadPhoto);

module.exports = router;