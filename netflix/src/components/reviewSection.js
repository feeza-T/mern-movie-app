// ReviewSection.js
import React from 'react';

const ReviewSection = () => {
    return (
        <section className="mb-24 mt-20">
            <div className="text-left bg-gradient-to-r from-black to-gray-800 rounded-xl grid grid-cols-1 lg:grid-cols-2 px-7 md:px-16">
                {/* Text Section */}
                <div className="flex justify-center items-center overflow-hidden">
                    <div className="w-5/6">
                        <h1 className="text-5xl text-white font-bold mb-5 mt-10">See What Movie Fans Are Saying</h1>
                        <p className="mb-5 text-gray-500">
                            Hear from our dedicated movie lovers who share their experiences of discovering the best films, series, and exclusive content on our platform. Their passion drives us to deliver top-notch entertainment.
                        </p>
                        <button className=" mt-20 flex items-center bg-gray-800 text-white text-gray font-bold text-xl btn rounded-full mb-10 pl-5 pr-5 pt-2 pb-2">
                            Show All Reviews
                        </button>
                    </div>
                </div>

                {/* Review Card Section */}
                <div className="relative py-24">
                    {/* Middle Card */}
                    <div className="absolute z-10 top-44 md:top-52">
                        <div className="h-56 w-full md:w-3/4 bg-black text-white rounded-lg flex items-center px-5">
                            <div className="absolute -top-5 -left-5 bg-black rounded-full">
                                <img src="assets/client.png" alt="" />
                            </div>
                            <div>
                                <p className="text-gray mb-5">"The movie selection here is unbeatable! I found films I’ve been searching for forever, and the streaming quality is amazing."</p>
                                <h1 className="font-bold text-xl">Sarah Johnson</h1>
                                <small className="font-bold text-gray-500">Film Critic</small>
                            </div>
                        </div>
                    </div>

                    {/* Top Card */}
                    <div className="relative left-8 md:left-32 h-56 w-full md:w-3/4 bg-gray-700 text-white rounded-lg flex items-center px-5 opacity-50">
                        <div className="absolute -top-5 -left-5 bg-gray-500 rounded-full">
                            <img src="" alt="" />
                        </div>
                        <div>
                            <p className="text-black mb-5">"This platform changed my movie nights forever! The range of genres and the number of classics they have is unmatched."</p>
                            <h1 className="font-bold text-xl">David Lee</h1>
                            <small className="font-bold text-gray-500">Movie Enthusiast</small>
                        </div>
                    </div>

                    {/* Bottom Card */}
                    <div className="relative left-8 md:left-32 top-10 h-56 w-full md:w-3/4 bg-gray-500 text-black rounded-lg flex items-center px-5 opacity-50">
                        <div className="absolute -top-5 -left-5 bg-black rounded-full">
                            <img src="assets/client.png" alt="" />
                        </div>
                        <div>
                            <p className="text-gray mb-5">"I’ve never seen a platform with such smooth streaming and brilliant HD quality. Perfect for movie marathons!"</p>
                            <h1 className="font-bold text-xl">Emily Clark</h1>
                            <small className="font-bold text-gray-500">Movie Buff</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
