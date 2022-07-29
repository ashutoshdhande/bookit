const mongoose = require('mongoose');
const Movie = require('./Movie');

const showSchema = new mongoose.Schema({
  cinemaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  showDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  screen: {
    type: Number,
    required: true,
  },
  tmdb_id: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  movie: {
    ...Movie,
  },
});

module.exports = mongoose.model('Show', showSchema);
