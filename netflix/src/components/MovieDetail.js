import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header'; // Import the Header component

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <div className='flex flex-col items-center justify-center pt-20'>
        <img src={movie.imageUrl} alt={movie.name} className='w-full max-w-md h-auto rounded-md' />
        <h2 className='text-2xl text-white mt-4'>{movie.name}</h2>
        <p className='text-gray-300 mt-2'>{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
