import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { useSelector } from "react-redux";
import nowPlayingMovies from '../movieData/NowPlaying';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';

const MovieContainer = () => {
  const movie = useSelector(store => store.movie);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const movieData = {
    nowPlayingMovies: nowPlayingMovies
  };

  // movie backend e pathano and save kora


  const sendNowPlayingToBackend = async () => {
    try {
      // Send only the movies array, not an object wrapper
      const response = await axios.post(`${API_END_POINT}/movies`, movieData.nowPlayingMovies, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Movies sent to backend:', response.data);
    } catch (error) {
      console.error('Error sending movies to backend:', error.response ? error.response.data : error.message);
    }
  };

 

  // sendNowPlayingToBackend(); movie save er por fetch kora
  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken'); // Optionally handle refresh token if needed
  
        const response = await axios.get(`${API_END_POINT}/moviesData`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token
            'x-refresh-token': refreshToken, // Send the refresh token as well
          }
        });
  
        // Check for a new token in the response headers
        const newToken = response.headers['x-new-token'];
        if (newToken) {
          localStorage.setItem('token', newToken); // Save the new token in local storage
        }
  
        setNowPlayingMovies(response.data); // Update the state with fetched movies
        console.log('Fetched movies from backend:', response.data);
      } catch (error) {
        console.error('Error fetching movies from backend:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchNowPlayingMovies();
  }, []);
  
  
  return (
    <div className='bg-black'>
      <div className='-mt-52 relative z-10'>
        <MovieList title={"Popular Movies"} movies={movie.popularMovie} />
        <MovieList title={"Now Playing Movies"} movies={movieData.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
