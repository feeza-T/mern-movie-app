// List.js
import React from 'react';
import Header from './Header';

const staticMovies = [
  {
    id: 1,
    name: 'Inception',
    type: 'Film',
    year: '2010',
    runtime: '148 min',
    class: 'IMDB',
    imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v8_ae.jpg',
  },
  {
    id: 2,
    name: 'Interstellar',
    type: 'Film',
    year: '2014',
    runtime: '169 min',
    class: 'IMDB',
    imageUrl: 'https://ebertfest.com/sites/default/files/large_lbGGuk9K1kNQqDabaMyFz1L9iTg.jpg',
  },
];

const List = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <div className='flex flex-col items-center justify-center pt-20'>
        <h1 className='text-3xl text-white mb-5'>My List</h1>
        <div className='overflow-x-auto w-full px-10'>
          <table className='min-w-full bg-gray-800 text-white rounded-lg'>
            <thead className='bg-gray-700'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Type</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Year</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Runtime</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Class</th>
              </tr>
            </thead>
            <tbody className='bg-gray-800'>
              {staticMovies.map(movie => (
                <tr key={movie.id} className='border-t border-gray-700'>
                  <td className='px-6 py-4 whitespace-nowrap'>{`t${movie.id}`}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.type}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.year}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.runtime}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;


