const mongoose = require('mongoose');

const ProfileBase = require('./ProfileBase');

const cinemaSchema = new mongoose.Schema({
  ...ProfileBase,
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cinema', cinemaSchema);
