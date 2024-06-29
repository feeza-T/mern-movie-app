import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from './Header'; // Import the Header component
import { FaEdit, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const staticMovies = [
  {
    id: 1,
    name: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v8_ae.jpg',
  },
  {
    id: 2,
    name: 'Interstellar',
    description: 'In Earths future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earths population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankinds new home.',
    imageUrl: 'https://ebertfest.com/sites/default/files/large_lbGGuk9K1kNQqDabaMyFz1L9iTg.jpg',
  },
  
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = staticMovies.filter(movie =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredMovies([]);
  };

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <div className='flex flex-col items-center justify-center pt-20'>
        <div className='relative'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a movie..."
            className='p-2 m-4 rounded-sm bg-gray-800 text-white pr-10'
          />
          <FaEdit className='absolute top-4 right-12 text-gray-500' />
          <FaTimes onClick={clearSearch} className='absolute top-4 right-4 text-gray-500 cursor-pointer' />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredMovies.map(movie => (
            <div key={movie.id} className='p-4 bg-gray-800 rounded-md'>
              <Link to={`/movie/${movie.id}`}>
                <img src={movie.imageUrl} alt={movie.name} className='w-full h-auto' />
                <h2 className='text-xl text-white mt-2'>{movie.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

