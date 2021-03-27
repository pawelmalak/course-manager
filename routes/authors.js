const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/auth');

const {
  getAuthor,
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authors');

router
  .route('/')
  .get(getAuthors)
  .post(protected, createAuthor);

router
  .route('/:id')
  .get(getAuthor)
  .put(protected, updateAuthor)
  .delete(protected, deleteAuthor);

module.exports = router;