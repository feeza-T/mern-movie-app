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
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(null));
                navigate("/");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error("An error occurred while logging out.");
        }
    };

    const toggleHandler = () => {
        dispatch(setToggle());
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProfileToggle = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <div className={`absolute z-10 flex w-full items-center justify-between px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-black'}`}>
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {user && (
                <div className='flex items-center'>
                    {/* Profile Button */}
                    <button onClick={handleProfileToggle} className={`bg-red-800 text-white px-4 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>Profile</button>

                    {/* Logout Button */}
                    <button onClick={logoutHandler} className={`bg-red-800 text-white px-4 py-2 ml-2 ${darkMode ? 'text-white' : 'text-black'}`}>Logout</button>

                    {/* Search Movie Button */}
                    <button onClick={toggleHandler} className={`bg-red-800 text-white px-4 py-2 ml-2 ${darkMode ? 'text-white' : 'text-black'}`}>{toggle ? "Home" : "Search Movie"}</button>

                    {/* Profile Sidebar */}
                    {isProfileOpen && (
                        <div className={`fixed top-0 right-0 h-full w-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} z-20 p-4 shadow-lg`}>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-xl'>{user.fullName}</h2>
                                <button onClick={handleProfileToggle} className='text-white text-2xl'>X</button>
                            </div>

                            <div className='mt-4'>
                                {/* Movie Types */}
                                <div className='flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer' onClick={handleDropdownToggle}>
                                    <span>Movie Types</span>
                                    <IoIosArrowDropdown size="20px" color='white' />
                                </div>

                                {/* Categories Dropdown */}
                                {dropdownOpen && (
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

                                {/* Dark Mode Toggle */}
                                <div className='flex items-center mt-6'>
                                    <span className='mr-2'>Dark Mode</span>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        
                                        <div className='w-11 h-6 bg-gray-200 rounded-full'></div>
                                        <div className={`absolute inset-y-0 left-0 flex items-center justify-center w-6 h-6 transition-transform transform bg-white rounded-full ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                    </label>
                                </div>

                                <div className='mt-6'>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <button>Add List</button>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/my-account">My Account</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/settings">Settings</a>
                                    </div>
                                    <div className='p-2 hover:bg-gray-700 cursor-pointer'>
                                        <a href="/help">Help Center</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;