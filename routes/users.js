const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  favoriteCourse
} = require('../controlers/users');

router
  .route('/')
  .put(favoriteCourse)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;