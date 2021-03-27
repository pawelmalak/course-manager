const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  favoriteCourse
} = require('../controllers/users');

router
  .route('/')
  .get(getUsers)
  .put(favoriteCourse)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;