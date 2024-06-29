import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleHomeButtonClick = () => {
    console.log("Home button clicked"); // Debug log
    navigate('/');
  }

  return (
    <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
      <div className='flex items-center'>
        <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
        <button className='bg-red-800 text-white px-4 py-2 ml-4'>My Lists</button>
      </div>
      <div className='flex items-center'>
        <IoIosArrowDropdown size="24px" color='white' />
        <h1 className='text-lg font-medium text-white'>Hello</h1>
        <div className='ml-4'>
          <button className='bg-red-800 text-white px-4 py-2'>Logout</button>
          {location.pathname === '/search' ? (
            <button onClick={handleHomeButtonClick} className='bg-red-800 text-white px-4 py-2 ml-2'>Home</button>
          ) : (
            <button onClick={() => navigate('/search')} className='bg-red-800 text-white px-4 py-2 ml-2'>Search</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
