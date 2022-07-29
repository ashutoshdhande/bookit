const movieSchema = {
  name: {
    type: String,
    required: true,
  },
  adult: {
    type: Boolean,
    required: true,
    default: false,
  },
  tmdb_id: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
  },
  language: {
    type: String,
    default: 'en',
    required: true,
  },
  genre: {
    type: Array,
  },
};

module.exports = movieSchema;
