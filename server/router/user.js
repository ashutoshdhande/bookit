const express = require('express');
const { signup, login, logout } = require('../controller/user');
const authMW = require('../middleware/authMW');
const { belowSixteen } = require('../middleware/timeDateMW');
const { userValidationRules, validate } = require('../middleware/validator');

const router = express.Router();

// @route /user/signup
// @desc  Sign up User
router.post('/signup', userValidationRules(), validate, belowSixteen, signup);

// @route /user/login
// @desc  Login User
router.post('/login', login);

// @route /user/logout
// @desc  Logout User
router.get('/logout', logout);

module.exports = router;
