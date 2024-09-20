import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { useSelector } from "react-redux";
import nowPlayingMovies from '../movieData/NowPlaying';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';


const MovieContainer = () => {
  const navigate = useNavigate();
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
        const refreshToken = localStorage.getItem('refreshToken'); // Get the refresh token from localStorage
  
        const response = await axios.put(
          `${API_END_POINT}/moviesData`,
          {

          }, // Empty body for the PUT request, if no payload is needed
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the access token
              'x-refresh-token': refreshToken, // Include the refresh token if available
            },
          }
        );
  
        // Check if a new token is provided in the response headers
        const newToken = response.headers['x-new-token'];
        if (newToken) {
          localStorage.setItem('token', newToken); // Update token in localStorage
          console.log('New access token received and stored.');
          navigate("/browse"); 
        }
  
        // Update the state with the fetched movies
        setNowPlayingMovies(response.data);
        console.log('Fetched movies from backend:', response.data);
      } catch (error) {
        console.error(
          'Error fetching movies from backend:',
          error.response ? error.response.data : error.message
        );
  
        // Optionally, handle specific error responses like token expiration
        if (error.response?.status === 401) {
          console.log('Unauthorized: Token might be expired or invalid.');
          // Optionally, redirect to login or refresh token logic
        }
      }
    };
  
    fetchNowPlayingMovies();
  }, []); // Empty dependency array, so it runs on component mount
  
  
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
