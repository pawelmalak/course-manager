const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc      Register user
// @method    POST
// @route     /api/v1/auth/register
// @access    Public
exports.register = asyncWrapper(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(user, res, 201);
})

// @desc      Login user
// @method    POST
// @route     /api/v1/auth/login
// @access    Public
exports.login = asyncWrapper(async (req, res, next) => {
  // Check if user provided email and password
  if (!req.body.email  || !req.body.password) {
    return next(new ErrorResponse(400, 'Email and password are required'));
  }

  // Find user with provided email
  const user = await User.findOne({ email: req.body.email }).select('+password');

  if (!user) {
    return next(new ErrorResponse(404, 'Invalid credentials'));
  }

  // Compare passwords
  const passwordIsMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordIsMatch) {
    return next(new ErrorResponse(404, 'Invalid credentials'));
  } else {
    sendToken(user, res, 200)
  }
})

const sendToken = (user, res, status) => {
  // Create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.status(status).json({
    success: true,
    token
  });
}