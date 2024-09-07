import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, searchMovie = false, darkMode = false }) => {
    return (
        <div className={`px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h1 className={`text-3xl py-3 ${darkMode ? 'text-white' : 'text-black'}`}>{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar cursor-pointer'>
                <div className='flex items-center'>
                    {
                        movies?.map((movie) => (
                            <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MovieList;
