const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getLessons
} = require('../controllers/lessons');

router
  .route('/')
  .get(getLessons);

module.exports = router;