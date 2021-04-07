const asyncWrapper = require('../middleware/asyncWrapper');
const ErrorResponse = require('../utils/ErrorResponse');
const Author = require('../models/Author');

// @desc      Get all authors
// @method    GET
// @route     /api/v1/authors
// @access    Public
exports.getAuthors = asyncWrapper(async (req, res, next) => {
  const authors = await Author.find();

  res.status(200).json({
    success: true,
    data: authors
  });
})

// @desc      Get single author
// @method    GET
// @route     /api/v1/authors/:id
// @access    Public
exports.getAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findById(req.params.id).populate({
    path: 'courses',
    select: ['name', 'url', 'lessons', 'createdAt']
  });

  if (!author) {
    return next(new ErrorResponse(404, `Author with id of ${req.params.id} was not found`))
  }

  res.status(200).json({
    success: true,
    data: author
  });
})

// @desc      Create author
// @method    POST
// @route     /api/v1/authors
// @access    Private
exports.createAuthor = asyncWrapper(async (req, res, next) => {
  if (req.file) {
    req.body = {
      ...req.body,
      avatar: req.file.filename
    }
  }

  const author = await Author.create(req.body);

  res.status(201).json({
    success: true,
    data: author
  });
})

// @desc      Update author
// @method    PUT
// @route     /api/v1/authors/:id
// @access    Private
exports.updateAuthor = asyncWrapper(async (req, res, next) => {
  let author = await Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorResponse(404, `Author with id of ${req.params.id} was not found`))
  }

  author = await Author.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: Date.now()
  }, {
    runValidators: true,
    new: true
  });

  res.status(200).json({
    success: true,
    data: author
  });
})

// @desc      Delete author
// @method    DELETE
// @route     /api/v1/authors/:id
// @access    Private
exports.deleteAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorResponse(404, `Author with id of ${req.params.id} was not found`))
  }

  await author.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
})