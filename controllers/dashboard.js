const asyncWrapper = require('../middleware/asyncWrapper');
const Course = require('../models/Course');
const Author = require('../models/Author');
const User = require('../models/User');

// @desc      Get number of documents from set of collections
// @method    GET
// @route     /api/v1/dashboard
// @access    Admin
exports.getCount = asyncWrapper(async (req, res, next) => {
  const courses = await Course.countDocuments();
  const authors = await Author.countDocuments();
  const users = await User.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      courses,
      authors,
      users
    }
  })
})