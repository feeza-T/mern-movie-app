import Movie from "../models/nowPlayingModel";

// Controller to add multiple movies
export const addMovies = async (req, res) => {
  try {
    const movies = req.body; // expecting an array of movie objects

    if (!Array.isArray(movies)) {
      return res.status(400).json({ message: 'Invalid input. Expected an array of movies.' });
    }

    // Validate and format the movie objects before inserting
    const newMovies = movies.map(movie => ({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      movie_id: movie.movie_id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count
    }))

    // Insert all movies into MongoDB at once
    await Movie.insertMany(newMovies);

    // Return success response
    res.status(201).json({ message: 'Movies added successfully', movies: newMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not add movies.', error });
  }
};
