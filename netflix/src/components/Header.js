import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
//import { API_END_POINT } from '../utils/constant';
//import axios from "axios";
//import { setUser } from '../redux/userSlice';
//import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";

const Header = () => {
    const user = useSelector((store) => store.app.user);
    //const dispatch = useDispatch();
    //const navigate = useNavigate();

    

    return (
        <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 bg-gradient-to-b from-black'>
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {user && (
                <div className='flex items-center'>
                    <IoIosArrowDropdown size="24px" color='white' />
                    <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                    
                </div>
            )}
        </div>
    );
};

export default Header;
