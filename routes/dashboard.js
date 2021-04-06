const express = require('express');
const router = express.Router();

const {
  getCount
} = require('../controllers/dashboard');

router
  .route('/')
  .get(getCount);

module.exports = router;