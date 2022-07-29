const mongoose = require('mongoose');
const ProfileBase = require('./ProfileBase');

const userSchema = new mongoose.Schema({
  ...ProfileBase,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  token: String,
});

module.exports = mongoose.model('User', userSchema);
