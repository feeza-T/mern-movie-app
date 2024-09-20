import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setToggle } from '../redux/movieSlice';
import { FaCamera, FaStar, FaChartBar } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Chart from 'chart.js/auto'; // Import Chart.js

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector((store) => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const [isSeeReviewsOpen, setIsSeeReviewsOpen] = useState(false);
    const [isTopWatchedOpen, setIsTopWatchedOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [topWatchedMovies, setTopWatchedMovies] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        setReviews(savedReviews);
        setTopWatchedMovies([
            { title: 'Inception', views: 120 },
            { title: 'Avatar', views: 90 },
            { title: 'The Dark Knight', views: 150 }
        ]);
    }, []);

    const logoutHandler = async () => {
       
            // Clear tokens from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            
            // Clear user from Redux store
            dispatch(setUser(null)); // Assuming setUser can take null to clear user data
            navigate("/"); // Redirect to the home page or login page
      
        
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

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleAddReviewToggle = () => {
        setIsAddReviewOpen(!isAddReviewOpen);
    };

    const handleSeeReviewsToggle = () => {
        setIsSeeReviewsOpen(!isSeeReviewsOpen);
    };

    const handleSubmitReview = () => {
        const newReview = {
            text: reviewText,
            rating: reviewRating,
            userName: user ? user.fullName : 'Anonymous',
            movieName: 'Sample Movie' // Placeholder for movie name, you can adjust this as needed
        };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        setReviewText('');
        setReviewRating(1);
        setIsAddReviewOpen(false);
    };

    const handleTopWatchedToggle = () => {
        setIsTopWatchedOpen(!isTopWatchedOpen);
    };

    const renderTopWatchedGraph = () => {
        const ctx = document.getElementById('topWatchedChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topWatchedMovies.map(movie => movie.title),
                datasets: [{
                    label: 'Views',
                    data: topWatchedMovies.map(movie => movie.views),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    useEffect(() => {
        if (isTopWatchedOpen) {
            renderTopWatchedGraph();
        }
    }, [isTopWatchedOpen]);

    return (
        <div className="absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black">
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {user && (
                <div className='flex items-center'>
                    <button onClick={handleProfileToggle} className='bg-red-800 text-white px-4 py-2'>Profile</button>
                    <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>{toggle ? "Home" : "Search Movie"}</button>
                    <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>Logout</button>

                    {isProfileOpen && (
                        <div className='fixed top-0 right-0 h-full w-64 bg-gray-700 text-gray-200 z-20 p-4 shadow-lg'>
                            <button
                                onClick={handleProfileToggle}
                                className='absolute top-2 right-2 text-gray-300 text-2xl'
                            >
                                <AiOutlineClose />
                            </button>

                            <div className='relative flex justify-center mt-12 '>
                                <img
                                    src={selectedImage || "https://via.placeholder.com/100"}
                                    alt="Profile"
                                    className="rounded-full w-24 h-24 border border-gray-400"
                                />
                                <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full cursor-pointer">
                                    <FaCamera color='gray' />
                                </label>
                                <input
                                    type="file"
                                    id="profilePic"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className='flex justify-center items-center mt-4'>
                                <h2 className='text-2xl text-white'>{user.fullName}</h2>
                            </div>

                            <div className='mt-4'>
                                <div className='flex items-center justify-between p-2 hover:bg-black text-gray-300 cursor-pointer' onClick={handleDropdownToggle}>
                                    <span>Movie Types</span>
                                    <IoIosArrowDropdown size="20px" color='gray-300' />
                                </div>

                                {dropdownOpen && (
                                    <div className='ml-4'>
                                        <div className='p-2 hover:bg-gray-800 cursor-pointer'>
                                            <a href="/action">Action</a>
                                        </div>
                                        <div className='p-2 hover:bg-gray-800 cursor-pointer'>
                                            <a href="/thriller">Thriller</a>
                                        </div>
                                        <div className='p-2 hover:bg-gray-800 cursor-pointer'>
                                            <a href="/comedy">Comedy</a>
                                        </div>
                                        <div className='p-2 hover:bg-gray-800 cursor-pointer'>
                                            <a href="/drama">Drama</a>
                                        </div>
                                        <div className='p-2 hover:bg-gray-800 cursor-pointer'>
                                            <a href="/romance">Romance</a>
                                        </div>
                                    </div>
                                )}

                                <div className=''>
                                <div className='p-2 hover:bg-black text-gray-300 cursor-pointer'>
                                        <button >My Lists</button>
                                    </div>
                                    <div className='p-2 hover:bg-black text-gray-300 cursor-pointer'>
                                        <button onClick={handleAddReviewToggle}>Add Review</button>
                                    </div>
                                    <div className='p-2 hover:bg-black text-gray-300 cursor-pointer'>
                                        <button onClick={handleSeeReviewsToggle}>See Other Reviews</button>
                                    </div>
                                    <div className='p-2 hover:bg-black text-gray-300 cursor-pointer'>
                                        <button onClick={handleTopWatchedToggle}>Trending Movies Insights  <FaChartBar className='inline mr-2 text-white' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Review Section */}
                    {isAddReviewOpen && (
                        <div className='fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-30'>
                            <div className='bg-black text-gray-300 p-6 rounded-lg shadow-lg w-96 relative'>
                                <button
                                    onClick={handleAddReviewToggle}
                                    className='absolute top-2 right-2 text-gray-300 text-xl'
                                >
                                    <AiOutlineClose />
                                </button>
                                <h2 className='text-xl mb-4'>Add Review</h2>
                                <textarea
                                    className='w-full p-2 bg-black text-gray-300 border border-gray-300 rounded mb-4'
                                    placeholder='Write your review...'
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                                <div className='flex mb-4'>
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <FaStar
                                            key={rating}
                                            color={rating <= reviewRating ? 'gold' : 'gray'}
                                            className='mr-1 cursor-pointer'
                                            onClick={() => setReviewRating(rating)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleSubmitReview}
                                    className='bg-red-900 text-white px-4 py-2 rounded'
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                
 {/* See Reviews Section */}
{isSeeReviewsOpen && (
    <div className='fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-30'>
        <div className='bg-black text-gray-300 p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] relative overflow-y-auto'>
            <button
                onClick={handleSeeReviewsToggle}
                className='absolute top-2 right-2 text-gray-300 text-xl'
            >
                <AiOutlineClose />
            </button>
            <h2 className='text-xl mb-4'>Recent Reviews</h2>
            <div>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className='mb-4 p-2 border-b'>
                            <h3 className='text-lg font-semibold'>{review.userName}</h3>
                            <p className='text-gray-500'>{review.text}</p>
                            <div className='flex mt-2'>
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <FaStar
                                        key={rating}
                                        color={rating <= review.rating ? 'gold' : 'gray'}
                                        className='mr-1'
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    </div>
)}

    {/* Top Watched Movies Section */}
    {isTopWatchedOpen && (
                <div className='fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-30'>
                    <div className='bg-black text-gray-300 p-6 rounded-lg shadow-lg w-[600px] relative'>
                        <button
                            onClick={handleTopWatchedToggle}
                            className='absolute top-2 right-2 text-gray-300 text-xl'
                        >
                            <AiOutlineClose />
                        </button>
                        <h2 className='text-xl mb-4 text-white'>
                            <FaChartBar className='inline mr-2 text-white' /> Top Watched Movies
                        </h2>
                        <canvas id='topWatchedChart' width="400" height="400"></canvas>
                    </div>
                </div>
            )}

                </div>
            )}
        </div>
    );
};

export default Header;
