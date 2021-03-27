const express = require('express');
const router = express.Router();

// Include other resource routers
const userRouter = require('./users');
const lessonRouter = require('./lessons');

// Re-route into other resource routers
router.use('/:courseId/favorite', userRouter);
router.use('/:courseId/lessons', lessonRouter);

const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');
const { route } = require('./users');

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