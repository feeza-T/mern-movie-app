import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-8 bg-black text-white'>
            <h1 className='text-3xl py-3'>{title}</h1>
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
