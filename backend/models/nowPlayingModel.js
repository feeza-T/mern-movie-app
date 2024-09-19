const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    required: true,
    default: false
  },
  backdrop_path: {
    type: String,
    required: true
  },
  genre_ids: {
    type: [Number],
    required: true
  },
  movie_id: {
    type: Number,
    required: true,
    unique: true
  },
  original_language: {
    type: String,
    required: true
  },
  original_title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  video: {
    type: Boolean,
    required: true,
    default: false
  },
  vote_average: {
    type: Number,
    required: true
  },
  vote_count: {
    type: Number,
    required: true
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
