const express = require('express');
const router = express.Router();

const {
  getAuthor,
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controlers/authors');

router
  .route('/')
  .get(getAuthors)
  .post(createAuthor);

router
  .route('/:id')
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;