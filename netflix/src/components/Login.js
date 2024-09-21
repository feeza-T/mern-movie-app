import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.app.isLoading);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (token && user) {
            dispatch(setUser(user));
            navigate("/browse");
        }
    }, [dispatch, navigate]);

    const loginHandler = () => {
        setIsLogin(!isLogin);
    };

    const getInputData = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
    
        const user = { email, password };
        if (!isLogin) {
            user.fullName = fullName;
        }
    
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const res = await axios.post(`${API_END_POINT}${endpoint}`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
    
            if (res.data && res.data.success) {
                toast.success(res.data.message);
                if (isLogin) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    
                    dispatch(setUser(res.data.user));
                    navigate("/browse");
                } else {
                    setIsLogin(true);
                }
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred");
            } else {
                toast.error("Error: " + error.message);
            }
        } finally {
            dispatch(setLoading(false));
            setFullName("");
            setEmail("");
            setPassword("");
        }
    };
    
    return (
        <div className='relative'>
            <Header />
            <div className='absolute'>
                <img
                    className='w-[100vw] h-[100vh] bg-cover'
                    src="https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg"
                    alt="banner"
                />
            </div>

            {/* Welcome Message */}
            <div className='text-center absolute top-20 left-0 right-0 mx-auto w-full'>
                <h2 className='text-red-600 text-5xl font-bold mb-4'>Welcome to TTFlix!</h2>
                <p className='text-gray-400 w-6/12 mx-auto'>
                    Discover, watch, and enjoy your favorite movies from a vast collection of classics, blockbusters, and hidden gems.
          
                    
                </p>
            </div>

            {/* Login/Signup Form */}
            <form
                onSubmit={getInputData}
                className='flex flex-col w-3/12 p-12 my-52 left-0 right-0 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90'
            >
                <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Login" : "Signup"}</h1>
                <div className='flex flex-col'>
                    {!isLogin && (
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type='text'
                            placeholder='Fullname'
                            className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'
                        />
                    )}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Email'
                        className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'
                    />
                    <button
                        type='submit'
                        className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'
                    >
                        {isLoading ? "Loading..." : (isLogin ? "Login" : "Signup")}
                    </button>
                    <p className='text-white mt-2'>
                        {isLogin ? "New to TTFlix?" : "Already have an account?"}
                        <span
                            onClick={loginHandler}
                            className='ml-1 text-blue-900 font-medium cursor-pointer'
                        >
                            {isLogin ? "Signup" : "Login"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
