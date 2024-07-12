import React, { useEffect } from 'react';
import Header from './Header';
//import footer from './footer'; // Import the Footer component
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';
import { setToggle } from '../redux/movieSlice';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_END_POINT } from '../utils/constant';

const Browse = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector((store) => store.movie.toggle);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // My custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const toggleHandler = () => {
        dispatch(setToggle());
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const viewListHandler = () => {
        navigate('/list');
    };

    return (
        <div>
            <Header />
            <div className="pt-20"> {/* Adjust padding-top to make space for fixed header */}
                <div className="flex justify-end pr-6 pb-4">
                    <button onClick={toggleHandler} className="bg-red-800 text-white px-4 py-2">
                        {toggle ? 'Home' : 'Search Movie'}
                    </button>
                    <button onClick={viewListHandler} className="bg-red-800 text-white px-4 py-2 ml-2">
                        List
                    </button>
                    <button onClick={logoutHandler} className="bg-red-800 text-white px-4 py-2 ml-2">
                        Logout
                    </button>
                </div>
                <div>
                    {toggle ? <SearchMovie /> : (
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>
                    )}
                </div>
            </div>
            <footer /> {/* Include the Footer component here */}
        </div>
    );
};

export default Browse;
