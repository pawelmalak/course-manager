const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const hashPassword = require('../utils/hashPassword');

const User = require('../models/User');
const Course = require('../models/Course');

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