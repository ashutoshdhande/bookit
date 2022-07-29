/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const Cinema = require('../model/Cinema');

exports.signup = async (req, res) => {
  try {
    // Grab fields
    // eslint-disable-next-line object-curly-newline
    const { name, city, address, email, password, postalCode, state } =
      req.body;

    // check if field exists
    if (
      !(name && city && email && password && address && postalCode && state)
    ) {
      return res.status(400).json({
        isSignedUp: false,
        msg: 'All fields are required',
      });
    }

    // find if email is already registered
    const emailExists = await Cinema.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        isSignedUp: false,
        msg: 'Email is already registered',
      });
    }

    // Encrypt password
    const hashPass = await bcrypt.hash(password, 10);

    // Creating User instance
    const cinema = await Cinema.create({
      name,
      city,
      email,
      password: hashPass,
      address,
      postalCode,
      state,
      registrationDate: DateTime.now(),
    });

    // Generate token
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ userId: cinema._id }, process.env.JWT_SECRET, {
      expiresIn: '72h',
    });
    cinema.token = token;
    cinema.password = undefined;

    return res.status(200).json({
      cinema,
      token,
      isSignedUp: true,
      msg: 'User Signed Up Successfully',
    });
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

    // Find Cinema in DB & Check if email exists
    const cinema = await Cinema.findOne({ email });
    if (!cinema) {
      return res.status(400).json({
        msg: 'Invalid Credentials!!!',
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, cinema.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Invalid Credentials!!!',
      });
    }

    // Generate token
    const token = jwt.sign({ cinemaId: cinema._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    cinema.token = token;
    cinema.password = undefined;
    // return res.status(200).json(cinema);

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

exports.getAuthUser = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.profile.cinemaId).select(
      '-password'
    );
    res.status(200).json(cinema);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCookie = (req, res) => {
  // console.log('cookie cleared');
  res.status(202).clearCookie('token').send('Cookie Cleared');
};
