const express = require('express');
const router = express.Router();

// Include other resource routers
const userRouter = require('./users');

// Re-route into other resource routers
router.use('/:courseId/favorite', userRouter);

const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controlers/courses');

router
  .route('/')
  .get(getCourses)
  .post(createCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;