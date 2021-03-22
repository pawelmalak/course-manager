const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  // Mongoose bad ObjectId
  if (err.name == 'CastError') {
    error = new ErrorResponse(404, 'Resource not found');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ErrorResponse(400, 'Duplicate field value entered');
  }

  // Mongoose validation error
  if (err.name == 'ValidationError') {
    error = new ErrorResponse(400, Object.values(error.errors).map(e => e.message));
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;