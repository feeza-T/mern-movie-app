import React, { useEffect } from 'react';
import MovieList from './MovieList';
import { useSelector } from "react-redux";
import nowPlayingMovies from '../movieData/NowPlaying';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';

const MovieContainer = () => {
  const movie = useSelector(store => store.movie);

  const movieData = {
    nowPlayingMovies: nowPlayingMovies
  };

  useEffect(() => {
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

    sendNowPlayingToBackend();
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
