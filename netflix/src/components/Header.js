import React, { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";
import { FaCamera, FaStar, FaChartBar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Chart from "chart.js/auto";
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [reviewLength, setReviewLength] = useState(0);
  const [isSeeReviewsOpen, setIsSeeReviewsOpen] = useState(false);
  const [isTopWatchedOpen, setIsTopWatchedOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const [reviews, setReviews] = useState();
  const [topWatchedMovies, setTopWatchedMovies] = useState([]);


  const fetchReviews = async () => {
    try {
        const response = await axios.get(`${API_END_POINT}/getReviews`, {
            withCredentials: true,
        });
        if (response.status === 200) {
            // Set reviews directly from the response
            const fetchedReviews = response.data || []; // Ensure it's an array
            setReviews(fetchedReviews);
            console.log("Fetched reviews:", fetchedReviews); // Log fetched reviews
            setReviewLength(fetchedReviews.length);
            toast.success("Reviews fetched successfully!");
            handleSeeReviewsToggle();
        } else {
            setReviews([]); // Reset to empty if there's a non-200 response
            toast.error("Failed to fetch reviews.");
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Reset to empty if an error occurs
        toast.error("An error occurred while fetching reviews.");
    }
};   

  const logoutHandler = async () => {
    try {
      await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Logout error:", error);
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

  const handleSeeReviewsToggle = async () => {
    if (!isSeeReviewsOpen) {
        try {
            const response = await axios.get(`${API_END_POINT}/getReviews`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                // Set reviews directly from the response
                const fetchedReviews = response.data || []; // Ensure it's an array
                setReviews(fetchedReviews);
                console.log("Fetched reviews:", fetchedReviews); // Log fetched reviews
                setReviewLength(fetchedReviews.length);
                toast.success("Reviews fetched successfully!");
            } else {
                setReviews([]); // Reset to empty if there's a non-200 response
                toast.error("Failed to fetch reviews.");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]); // Reset to empty if an error occurs
            toast.error("An error occurred while fetching reviews.");
        }
    }
    setIsSeeReviewsOpen(!isSeeReviewsOpen);
  };

  const handleSubmitReview = async () => {
    const newReview = {
      text: reviewText,
      rating: reviewRating,
      userName: user ? user.fullName : "Anonymous",
      movieName: "Sample Movie", // Adjust as necessary
    };

    console.log("Submitting review:", newReview);

    try {
      const response = await axios.post(
        `${API_END_POINT}/saveReviews`,
        newReview,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
       navigate("/browse");
        toast.success("Review submitted successfully!");
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(
          `Error: ${error.response.data.message || "An error occurred."}`
        );
      } else {
        toast.error("An error occurred while submitting the review.");
      }
    } finally {
      setReviewText("");
      setReviewRating(1);
      setIsAddReviewOpen(false);
    }
  };

  const handleTopWatchedToggle = () => {
    setIsTopWatchedOpen(!isTopWatchedOpen);
    if (!isTopWatchedOpen) {
      fetchTopWatchedMovies();
    }
  };

  const fetchTopWatchedMovies = async () => {
    // Sample data for top watched movies
    const sampleMovies = [
      { title: "Avatar", views: 50 },
      { title: "Titanic", views: 75 },
      { title: "Star Wars: The Force Awakens", views: 100 },
      { title: "Avengers: Endgame", views: 80 },
      { title: "Jurassic World", views: 60 },
    ];
    setTopWatchedMovies(sampleMovies);
  };

  const renderTopWatchedGraph = () => {
    const ctx = document.getElementById("topWatchedChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: topWatchedMovies.map((movie) => movie.title),
        datasets: [
          {
            label: "Views",
            data: topWatchedMovies.map((movie) => movie.views),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (isTopWatchedOpen) {
      renderTopWatchedGraph();
    }
  }, [isTopWatchedOpen]);

  const handleScrollToPremium = () => {
    const premiumSection = document.getElementById("premiumMovie");
    if (premiumSection) {
      premiumSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`absolute z-10 flex w-full items-center justify-between px-6 py-4 bg-gradient-to-b from-black to-gray-900 ${
        user ? "block" : "hidden"
      }`}
    >
      <h1 className="text-5xl text-red-600 font-bold">TTFlix</h1>

      <div className="ml-auto flex space-x-4">
        <button
          onClick={handleProfileToggle}
          className="bg-red-800 text-white px-4 py-2 rounded"
        >
          Profile
        </button>
        <button
          onClick={toggleHandler}
          className="bg-red-800 text-white px-4 py-2 ml-2 rounded"
        >
          {toggle ? "Home" : "Search Movie"}
        </button>
        <button
          onClick={logoutHandler}
          className="bg-red-800 text-white px-4 py-2 ml-2 rounded"
        >
          Logout
        </button>

        {isProfileOpen && (
          <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-gray-200 z-20 p-4 shadow-lg">
            <button
              onClick={handleProfileToggle}
              className="absolute top-2 right-2 text-gray-300 text-2xl"
            >
              <AiOutlineClose />
            </button>

            <div className="relative flex justify-center mt-12 ">
              <img
                src={selectedImage || "https://via.placeholder.com/100"}
                alt="Profile"
                className="rounded-full w-24 h-24 border border-gray-400"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full cursor-pointer"
              >
                <FaCamera color="white" />
              </label>
              <input
                type="file"
                id="profilePic"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-center items-center mt-4">
              <h2 className="text-2xl text-white">{user.fullName}</h2>
            </div>

            <div className="mt-4">
              <div
                className="flex items-center justify-between p-2 hover:bg-black text-gray-300 cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <span>Movie Types</span>
                <IoIosArrowDropdown size="20px" color="gray-300" />
              </div>

              {dropdownOpen && (
                <div className="ml-4">
                  <div className="p-2 hover:bg-gray-900 cursor-pointer">
                    <a href="/action">Action</a>
                  </div>
                  <div className="p-2 hover:bg-gray-900 cursor-pointer">
                    <a href="/thriller">Thriller</a>
                  </div>
                  <div className="p-2 hover:bg-gray-900 cursor-pointer">
                    <a href="/comedy">Comedy</a>
                  </div>
                  <div className="p-2 hover:bg-gray-900 cursor-pointer">
                    <a href="/drama">Drama</a>
                  </div>
                  <div className="p-2 hover:bg-gray-900 cursor-pointer">
                    <a href="/romance">Romance</a>
                  </div>
                </div>
              )}

              <div>
                <div className="p-2 hover:bg-black text-gray-300 cursor-pointer">
                  <button>
                    <Link to="/list">
                    My Lists
                    </Link>
                    </button>
                </div>
                <div className="p-2 hover:bg-black text-gray-300 cursor-pointer">
                  <button onClick={handleAddReviewToggle}>Add Review</button>
                </div>
                <div className="p-2 hover:bg-black text-gray-300 cursor-pointer">
                  <button onClick={handleSeeReviewsToggle}>
                    See Other Reviews
                  </button>
                </div>
                <div className="p-2 hover:bg-black text-gray-300 cursor-pointer">
                  <button onClick={handleTopWatchedToggle}>
                    Trending Movies Insights{" "}
                    <FaChartBar className="inline mr-2 text-white" />
                  </button>
                </div>
                <div className="p-2 hover:bg-black text-gray-300 cursor-pointer">
                  <a href="#premiumMovie" className="text-gray-300">
                    <button>Get Premium Movies</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Review Section */}
        {isAddReviewOpen && (
          <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-30">
            <div className="bg-black text-gray-300 p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={handleAddReviewToggle}
                className="absolute top-2 right-2 text-gray-300 text-xl"
              >
                <AiOutlineClose />
              </button>
              <h2 className="text-xl mb-4">Add Review</h2>
              <textarea
                className="w-full p-2 bg-black text-gray-300 border border-gray-300 rounded mb-4"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FaStar
                    key={rating}
                    color={rating <= reviewRating ? "gold" : "gray"}
                    className="mr-1 cursor-pointer"
                    onClick={() => setReviewRating(rating)}
                  />
                ))}
              </div>
              <button
                onClick={handleSubmitReview}
                className="bg-red-900 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* See Reviews Section */}
 {/* See Reviews Section */}
{isSeeReviewsOpen && (
    <div>
        <button 
            onClick={handleSeeReviewsToggle} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Show Reviews
        </button>

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
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className='mb-4 p-2 border-b'>
                                    <h3 className='text-lg font-semibold'>{review.userName}</h3>
                                    <p className='text-gray-500'>{review.text}</p>
                                    <div className='flex mt-2'>
                                        {[1, 2, 3, 4, 5].map((rating) => (
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
    </div>
)}


        {/* Top Watched Movies Section */}
        {isTopWatchedOpen && (
          <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-30">
            <div className="bg-black text-gray-300 p-6 rounded-lg shadow-lg w-[600px] relative">
              <button
                onClick={handleTopWatchedToggle}
                className="absolute top-2 right-2 text-gray-300 text-xl"
              >
                <AiOutlineClose />
              </button>
              <h2 className="text-xl mb-4 text-white">
                <FaChartBar className="inline mr-2 text-white" /> Top Watched
                Movies
              </h2>
              <canvas id="topWatchedChart" width="400" height="400"></canvas>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;