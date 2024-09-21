import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { useSelector } from "react-redux";
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const MovieContainer = () => {
  const navigate = useNavigate();
  const movie = useSelector(store => store.movie);
  
  // State for now playing and popular movies
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  // Movie data object for both nowPlaying and popular movies
  const movieData = {
    nowPlayingMovies: nowPlayingMovies,
    popularMovies: popularMovies,
  };

  // Fetch Now Playing Movies
  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
  
        const response = await axios.put(
          `${API_END_POINT}/moviesData`,
          {}, // Empty body for the PUT request
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'x-refresh-token': refreshToken,
            },
          }
        );

        const newToken = response.headers['x-new-token'];
        if (newToken) {
          localStorage.setItem('token', newToken);
          console.log('New access token received and stored.');
          navigate("/browse");
        }

        // Set state with fetched movies
        setNowPlayingMovies(response.data);
        console.log('Fetched Now Playing Movies:', response.data);
      } catch (error) {
        console.error(
          'Error fetching Now Playing Movies from backend:',
          error.response ? error.response.data : error.message
        );
  
        if (error.response?.status === 401) {
          console.log('Unauthorized: Token might be expired or invalid.');
        }
      }
    };

    fetchNowPlayingMovies();
  }, []);

  // Fetch Popular Movies
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await axios.post(
          `${API_END_POINT}/popularMovieData`,
          {}, // Empty body for the PUT request
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'x-refresh-token': refreshToken,
            },
          }
        );

        const newToken = response.headers['x-new-token'];
        if (newToken) {
          localStorage.setItem('token', newToken);
          console.log('New access token received and stored.');
          navigate("/browse");
        }

        // Set state with fetched popular movies
        setPopularMovies(response.data);
        console.log('Fetched Popular Movies:', response.data);
      } catch (error) {
        console.error(
          'Error fetching Popular Movies from backend:',
          error.response ? error.response.data : error.message
        );

        if (error.response?.status === 401) {
          console.log('Unauthorized: Token might be expired or invalid.');
        }
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className='bg-black'>
      <div className='-mt-52 relative z-10'>
        <MovieList title={"Popular Movies"} movies={movieData.popularMovies} />
        <MovieList title={"Now Playing Movies"} movies={movieData.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
