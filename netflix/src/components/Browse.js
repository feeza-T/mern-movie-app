import React, { useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';
import PremiumMovies from './PremiumMovies'; // Import the PremiumMovies component
import Footer from './Footer'; // Import the Footer component
import ReviewSection from './reviewSection';
import MovieRequestForm from './MovieRequestForm';

const Browse = () => {
    const user = useSelector(store => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const navigate = useNavigate();

    // Custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="pt-16 flex-grow"> {/* Add padding and allow this section to grow */}
                {toggle ? <SearchMovie /> : (
                    <>
                        <MainContainer />
                        <MovieContainer />
                        <PremiumMovies />
                         {/* Add PremiumMovies section here */}
                         <ReviewSection/>
                         <MovieRequestForm /> 
                    </>
                )}
            </div>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default Browse;
