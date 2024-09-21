import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumMovies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleUnlockClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const proceedToPayment = () => {
        closeModal();
        navigate("/payment");
    };

    const goToAllPremiumMovies = () => {
        navigate("/all-premium-movies"); // Adjust this route as needed
    };

    return (
        <section id ="premiumMovie " className="bg-black text-gray-300 pb-10 pt-10">
            <h1 className="flex justify-center font-bold text-4xl pt-20 text-white">Explore Our Premium Movie Collection</h1>
            <p className="flex justify-center items-center text-gray-500 pt-4 pb-8">Discover a selection of premium movies that offer an unforgettable viewing experience.</p>

            {/* Button to view all premium movies */}
            <div className="flex justify-center mb-8">
                <button 
                    onClick={goToAllPremiumMovies} 
                    className="bg-red-900 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition"
                >
                    View All Premium Movies
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 ml-5 mr-5">
                {/* Card 1 */}
                <div className="card bg-gray-900 shadow-xl p-5 border border-gray-500 rounded-md relative">
                    <div className="relative">
                        <img 
                            src="https://m.media-amazon.com/images/I/919mVr6ikcL._AC_UF894,1000_QL80_.jpg" 
                            alt="Inception" 
                            className="h-64 w-full object-cover rounded-t-md"
                        />
                        <i className="fa-solid fa-lock absolute top-2 left-2 text-yellow-400 h-8 w-8"></i>
                    </div>
                    <div className="flex gap-3 p-2">
                        <i className="fa-solid fa-calendar-days pt-1"></i>
                        <p className="pl-10 text-gray-500 pt-5">Release Date: July 16, 2010</p>
                    </div>
                    <div className="card-body text-left">
                        <h2 className="font-bold card-title text-white text-2xl mt-5 mb-5">Inception</h2>
                        <p className="text-gray-500">A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.</p>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold pt-5">Read More...</h3>
                            <i className="fa-solid fa-arrow-right text-black h-7 w-7 ml-2 rounded-full bg-btn-primary-bg flex items-center justify-center -rotate-45"></i>
                        </div>
                        <button 
                            className="mt-4 w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-600 transition"
                            onClick={handleUnlockClick}
                        >
                            Unlock this!
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card bg-gray-900 shadow-xl p-5 border border-gray-500 rounded-md relative">
                    <div className="relative">
                        <img 
                            src="https://icons.veryicon.com/png/Movie%20%26%20TV/Movie%20Mega%20Pack%203/The%20Shawshank%20Redemption.png" 
                            alt="The Shawshank Redemption" 
                            className="h-64 w-full object-cover rounded-t-md"
                        />
                        <i className="fa-solid fa-lock absolute top-2 left-2 text-yellow-400 h-8 w-8"></i>
                    </div>
                    <div className="flex gap-3 p-2">
                        <p className="text-gray-500 pl-10 pt-5">Release Date: September 23, 1994</p>
                    </div>
                    <div className="card-body text-left">
                        <h2 className="font-bold card-title text-white text-2xl mt-5 mb-5">The Shawshank Redemption</h2>
                        <p className="text-gray-500">Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</p>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold pt-5">Read More...</h3>
                            <i className="fa-solid fa-arrow-right text-black h-7 w-7 ml-2 rounded-full bg-btn-primary-bg flex items-center justify-center -rotate-45"></i>
                        </div>
                        <button 
                            className="mt-4 w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-600 transition"
                            onClick={handleUnlockClick}
                        >
                            Unlock this!
                        </button>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card bg-gray-900 shadow-xl p-5 border border-gray-500 rounded-md relative">
                    <div className="relative">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg" 
                            alt="The Godfather" 
                            className="h-64 w-full object-cover rounded-t-md"
                        />
                        <i className="fa-solid fa-lock absolute top-2 left-2 text-yellow-400 h-8 w-8"></i>
                    </div>
                    <div className="flex gap-3 p-2">
                        <p className="text-gray-500 pl-10 pt-5">Release Date: March 24, 1972</p>
                    </div>
                    <div className="card-body text-left">
                        <h2 className="font-bold card-title text-white text-2xl mt-5 mb-5">The Godfather</h2>
                        <p className="text-gray-500">An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.</p>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold pt-5">Read More...</h3>
                            <i className="fa-solid fa-arrow-right text-black h-7 w-7 ml-2 rounded-full bg-btn-primary-bg flex items-center justify-center -rotate-45"></i>
                        </div>
                        <button 
                            className="mt-4 w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-600 transition"
                            onClick={handleUnlockClick}
                        >
                            Unlock this!
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-black rounded-lg p-6 text-center shadow-lg">
                        <h2 className="text-2xl text-white font-bold mb-4">Unlock Premium Content</h2>
                        <p className="text-gray-500">You need to pay to unlock this movie. Would you like to proceed with the payment?</p>
                        <div className="mt-6 flex justify-between">
                            <button 
                                className="bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition w-1/2 mr-1"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 transition w-1/2 ml-1"
                                onClick={proceedToPayment}
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PremiumMovies;
