import { PopularMovie } from "../models/popularModel.js";

export const fetchPopularData = async (req, res) => {
    try {
      const movies = await PopularMovie.find(); // Fetch all movies from the database
      res.status(200).json(movies);      // Return the data as JSON
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching movies' });
    }
  };

  