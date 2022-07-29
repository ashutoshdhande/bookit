const express = require('express');
const authMW = require('../middleware/authMW');

const {
  signup,
  login,
  logout,
  getAuthUser,
  deleteCookie,
} = require('../controller/cinema');
const { addShow, updateShow } = require('../controller/show');
const { userValidationRules, validate } = require('../middleware/validator');

const router = express.Router();

// @route /cinema/signup
// @desc  Sign up Cinema
router.post('/signup', userValidationRules(), validate, signup);

// @route /cinema/login
// @desc  Sign in Cinema
router.post('/login', login);

// @route /cinema/logout
// @desc  Logout Cinema
router.get('/logout', logout);

// @route /cinema/deleteCookie
// @desc  Logout Cinema
router.get('/deleteCookie', deleteCookie);

// @route /cinema/auth
// @desc Get Logged in admin
// @protected yes
router.get('/auth', authMW, getAuthUser);

router.get('/', authMW, (req, res) => {
  res.send('MW test');
});

// @route /cinema/addShow
// @desc  Add a show to the db
// @protected yes
router.post('/addShow', authMW, addShow);

// @route /cinema/:id
// @desc  update  show
// @protected yes
router.put('/:id', authMW, updateShow);

module.exports = router;
