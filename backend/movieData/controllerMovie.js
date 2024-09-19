import { Movie } from "../models/nowPlayingModel.js";

// POST endpoint to save movies
export const NowPlaying = async (req, res) => {
  try {
    // Get the array of movies from the request body
    const movies = req.body;

    // Ensure the movies array is present
    if (!movies || !Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({ message: 'Invalid data format or empty movie list' });
    }

    // Validate each movie object in the array before saving
    const validMovies = movies.map((movie) => {
      return {
        adult: movie.adult || false,
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        video: movie.video || false,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      };
    });

    // Save multiple movies to the database using insertMany
    const savedMovies = await Movie.insertMany(validMovies);

    // Respond with the saved movies
    res.status(201).json({
      message: 'Movies saved successfully!',
      data: savedMovies
    });
  } catch (error) {
    console.error('Error saving movies:', error);
    
    // Check for validation errors from mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', error: error.message });
    }

    // Handle duplicate key error (if `id` is not unique)
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate Movie ID Error', error: error.keyValue });
    }

    // General error handler
    res.status(500).json({ message: 'Error saving movies', error });
  }
};
