import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';
import { IoMdClose } from 'react-icons/io'; // Import the cross icon
import { Link } from 'react-router-dom'; // Import Link

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const clearSearch = () => {
        setSearchMovie("");
        dispatch(setSearchMovieDetails({ searchMovie: "", movies: [] }));
    };

    return (
        <>
            <div className='flex justify-center pt-[10%] w-[100%]'>
                <form onSubmit={submitHandler} className='w-[50%]'>
                    <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]'>
                        <input
                            value={searchMovie}
                            onChange={(e) => { setSearchMovie(e.target.value) }}
                            className='w-full outline-none rounded-md text-lg'
                            type="text"
                            placeholder='Search Movies...'
                        />
                        <button className='bg-red-800 text-white rounded-md px-4 py-2'>
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                        {searchMovie && (
                            <IoMdClose
                                className='text-red-800 ml-2 cursor-pointer'
                                size={24}
                                onClick={clearSearch}
                            />
                        )}
                    </div>
                </form>
            </div>
            {searchedMovie && searchedMovie.length > 0 ? (
                <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
            ) : (
                <h1> t</h1>
            )}
            <div className='flex justify-center mt-4 space-x-4'>
                <Link to="/list" className='bg-red-800 hover:bg-blue-600 text-white px-4 py-2 rounded'>
                    My List
                </Link>
               
            </div>
        </>
    );
};

export default SearchMovie;
