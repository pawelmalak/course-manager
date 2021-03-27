const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const hashPassword = require('../utils/hashPassword');

const User = require('../models/User');
const Course = require('../models/Course');

// @desc      Get all users
// @method    GET
// @route     /api/v1/users/
// @access    Private
exports.getUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find().populate('favorites');

  res.status(200).json({
    success: true,
    data: users
  });
})

// @desc      Get single user
// @method    GET
// @route     /api/v1/users/:id
// @access    Private
exports.getUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(404, `User with id of ${req.params.id} was not found`));
  }

  res.status(200).json({
    success: true,
    data: user
  });
})

// @desc      Create user
// @method    POST
// @route     /api/v1/users
// @access    Public
exports.createUser = asyncWrapper(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
})

// @desc      Update user
// @method    PUT
// @route     /api/v1/users/:id
// @access    Private
exports.updateUser = asyncWrapper(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(404, `User with id of ${req.params.id} was not found`));
  }

  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  user = await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: Date.now()
  }, {
    runValidators: true,
    new: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
})

// @desc      Delete user
// @method    DELETE
// @route     /api/v1/users/:id
// @access    Private
exports.deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(404, `User with id of ${req.params.id} was not found`));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
})

// @desc      Toggle favorite course
// @method    PUT
// @route     /api/v1/courses/:courseId/favorite
// @access    Private
exports.favoriteCourse = asyncWrapper(async (req, res, next) => {
  // tmp
  req.user = { id: '6058c5bf3bc4d55a88b68320' };

  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return next(new ErrorResponse(404, `Course with id of ${req.params.courseId} was not found`));
  }

  const user = await User.findById(req.user.id);
  // Check if user already favorited this course
  if (user.favorites.find(el => el == req.params.courseId)) {
    user.favorites = user.favorites.filter(el => el != req.params.courseId)
  } else {
    user.favorites = [ ...user.favorites, req.params.courseId ];
  }
  await user.save();

  res.status(200).json({
    success: true,
    data: user.favorites
  })
})