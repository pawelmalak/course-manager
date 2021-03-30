const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Course = require('../models/Course');

// @desc      Get single course
// @method    GET
// @route     /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'author',
    select: ['name']
  });

  if (!course) {
    return next(new ErrorResponse(404, `Course with id of ${req.params.id} was not found`));
  }

  res.status(200).json({
    success: true,
    data: course
  });
})

// @desc      Get all courses
// @method    GET
// @route     /api/v1/courses
// @access    Public
exports.getCourses = asyncWrapper(async (req, res, next) => {
  const courses = await Course.find().populate({
    path: 'author',
    select: ['name']
  });

  res.status(200).json({
    success: true,
    data: courses
  });
})

// @desc      Create course
// @method    POST
// @route     /api/v1/courses
// @access    Private
exports.createCourse = asyncWrapper(async (req, res, next) => {
  req.body = {
    ...req.body,
    cover: req.files.cover[0].filename
  }
  const course = await Course.create(req.body);


  res.status(201).json({
    success: true,
    data: course
  });
})

// @desc      Update course
// @method    PUT
// @route     /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncWrapper(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new ErrorResponse(404, `Course with id of ${req.params.id} was not found`));
  }

  course = await Course.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: Date.now()
  }, {
    runValidators: true,
    new: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
})

// @desc      Delete course
// @method    DELETE
// @route     /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new ErrorResponse(404, `Course with id of ${req.params.id} was not found`));
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
})