/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const User = require('../model/User');

exports.signup = async (req, res) => {
  try {
    // Grab fields
    // eslint-disable-next-line object-curly-newline
    const { firstName, lastName, email, password, dob } = req.body;

    // check if field exists
    if (
      !(
        firstName &&
        lastName &&
        email &&
        password &&
        DateTime.fromISO(dob).isValid
      )
    ) {
      return res.status(400).json({
        msg: 'All fields are required',
      });
    }

    // find if email is already registered
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(200).json({
        msg: 'Email is already registered',
      });
    }

    // Encrypt password
    const hashPass = await bcrypt.hash(password, 10);

    // Creating User instance
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      dob,
      registrationDate: DateTime.now(),
    });

    // Generate token
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '72h',
    });

    user.token = token;
    user.password = undefined;
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong!!!',
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get email and password
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        msg: 'All fields are required',
      });
    }

    // Find User in DB & Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid Credentials!!!',
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Invalid Credentials!!!',
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    user.token = token;
    user.password = undefined;
    // return res.status(200).json(user);

    // Sending cookie
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    return res.status(200).cookie('token', token, options).json({
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong!!!',
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 }).status(200).json({
    msg: 'Logged out successfully',
  });
};
