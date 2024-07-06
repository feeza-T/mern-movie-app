import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import toast from "react-hot-toast";

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const handleHomeButtonClick = () => {
        console.log("Home button clicked");
        navigate('/');
    }

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            console.log(res);
            dispatch(setUser(null));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            <div className='flex items-center'>
                <button onClick={() => navigate('/list')} className='bg-red-800 text-white px-4 py-2 ml-4'>My Lists</button>
            </div>
            <div className='flex items-center'>
                <IoIosArrowDropdown size="24px" color='white' />
                <h1 className='text-lg font-medium text-white'>{user ? `Hello, ${user.fullName}` : 'Hello'}</h1>
                <div className='ml-4'>
                    <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2'>Logout</button>
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
