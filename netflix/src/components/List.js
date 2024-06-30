// List.js
import React, { useState } from 'react';
import Header from './Header';

const initialMovies = [
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
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMovie, setEditMovie] = useState(null);

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
  };

  const handleSaveEdit = (updatedMovie) => {
    setMovies(movies.map(movie => (movie.id === updatedMovie.id ? updatedMovie : movie)));
    setEditMovie(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <div className='flex flex-col items-center justify-center pt-20'>
        <h1 className='text-3xl text-white mb-5'>My List</h1>
        <input
          type='text'
          placeholder='Search by movie name'
          value={searchTerm}
          onChange={handleSearch}
          className='mb-5 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
        />
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
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-gray-800'>
              {filteredMovies.map(movie => (
                <tr key={movie.id} className='border-t border-gray-700'>
                  <td className='px-6 py-4 whitespace-nowrap'>{`t${movie.id}`}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.type}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.year}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.runtime}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{movie.class}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      onClick={() => handleEdit(movie)}
                      className='mr-3 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editMovie && (
          <div className='mt-10'>
            <h2 className='text-2xl text-white mb-3'>Edit Movie</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editMovie);
              }}
            >
              <div className='mb-3'>
                <label className='block text-white'>Name</label>
                <input
                  type='text'
                  value={editMovie.name}
                  onChange={(e) => setEditMovie({ ...editMovie, name: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white'>Type</label>
                <input
                  type='text'
                  value={editMovie.type}
                  onChange={(e) => setEditMovie({ ...editMovie, type: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white'>Year</label>
                <input
                  type='text'
                  value={editMovie.year}
                  onChange={(e) => setEditMovie({ ...editMovie, year: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white'>Runtime</label>
                <input
                  type='text'
                  value={editMovie.runtime}
                  onChange={(e) => setEditMovie({ ...editMovie, runtime: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white'>Class</label>
                <input
                  type='text'
                  value={editMovie.class}
                  onChange={(e) => setEditMovie({ ...editMovie, class: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none'
                />
              </div>
              <button
                type='submit'
                className='px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700'
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
