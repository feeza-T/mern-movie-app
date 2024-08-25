import React, { useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setToggle } from '../redux/movieSlice';

const Header = () => { 
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector((store) => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [myListOpen, setMyListOpen] = useState(false); // State to manage "My List" visibility

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(null)); // Clear user data from Redux
                navigate("/"); // Redirect to home page
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error("An error occurred while logging out.");
        }
    };

    const toggleHandler = () => {
        dispatch(setToggle()); // Toggle between Home and Search Movie
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
    };

    const handleMyListToggle = () => {
        setMyListOpen(!myListOpen); // Toggle My List visibility
    };

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {user && (
                <div className='relative flex items-center'>
                    <div className='flex items-center cursor-pointer' onClick={handleDropdownToggle}>
                        <IoIosArrowDropdown size="24px" color='white' />
                        <h1 className='text-lg font-medium text-white ml-2'>{user.fullName}</h1>
                    </div>
                    {dropdownOpen && (
                        <div className='absolute top-full right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-48'>
                            <div 
                                className='p-2 hover:bg-gray-700 cursor-pointer'
                            >
                                <span>My List</span>
                            </div>
                            <div 
                                className='p-2 hover:bg-gray-700 cursor-pointer'
                                onClick={handleMyListToggle}
                            >
                                <span>Movie Types</span>
                            </div>
                            {myListOpen && (
                                <div className='ml-4'>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/action">Action</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/thriller">Thriller</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/comedy">Comedy</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/drama">Drama</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/romance">Romance</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='ml-4'>
                        <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2'>Logout</button>
                        <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>{toggle ? "Home" : "Search Movie"}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
