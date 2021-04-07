const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/auth');

const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/avatars');
    },
    filename: (req, file, cb) => {
      const name = `${file.fieldname}-${Date.now()}-${Math.floor(Math.random() * 10000)}.${file.mimetype.split('/')[1]}`;
      cb(null, name);
    }
  })
});

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
  .post(upload.single('avatar'), createAuthor);

router
  .route('/:id')
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;