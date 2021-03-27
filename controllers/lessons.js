const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Lesson = require('../models/Lesson');

// @desc      Get all lessons for given course
// @method    GET
// @route     /api/v1/courses/:courseId/lessons
// @access    Public
exports.getLessons = asyncWrapper(async (req, res, next) => {
  const lessons = await Lesson.find({ course: req.params.courseId })
    .select('name')
    .collation({
      locale: 'en',
      numericOrdering: true
    })
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: lessons
  })
})