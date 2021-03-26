const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

// Protect routes from unauthorized requests
exports.protected = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse(401, 'You are not authorized to access this route'));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.id;

    next();
  } catch (err) {
    return next(new ErrorResponse(401, 'You are not authorized to access this route'));
  }
}