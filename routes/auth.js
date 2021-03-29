const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/auth');

const {
  login,
  register,
  getUser
} = require('../controllers/auth');

router.route('/').get(protected, getUser);
router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;