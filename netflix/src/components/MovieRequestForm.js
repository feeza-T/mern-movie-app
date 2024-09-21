import React from 'react';


const MovieRequestForm = () => {
    return (
        <section
            className=" pt-20 pb-20 bg-gray-800 opacity-90"
        >
            <div className="text-center">
                <button className=" pt-2 pb-2 pl-4 pr-4 items-center justify-center bg-black text-white font-bold text-xl btn rounded-full">
                   
                    Let's Connect
                </button>
                <h2 className="font-bold text-white text-4xl mt-4">Request Your Favorite Movie</h2>
                <p className="text-gray-400 p-8">
                    Can't find a movie? Let us know! We’re always adding new titles to ensure you enjoy the best movie-watching experience possible.
                </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="User Name*"
                    className="input input-bordered w-full p-2"
                />
                <input
                    type="text"
                    placeholder="Movie Name*"
                    className="input input-bordered w-full p-2"
                />
                <input
                    type="text"
                    placeholder="Releasing Date*"
                    className="input input-bordered w-full p-2"
                />
                <input
                    type="email"
                    placeholder="Actor/Actress Name from the movie*"
                    className="input input-bordered w-full p-2"
                />
            </div>
            <div className="m-5 max-w-6xl mx-auto">
                <textarea
                    className="textarea textarea-bordered w-full md:col-span-2"
                    placeholder="Write your movie request here"
                ></textarea>
                <button className="pt-2 items-center justify-center text-white bg-red-800 font-bold text-2xl btn w-full h-[50px] rounded-full mt-10">
                    Send Request
                    <i className="fa-solid fa-arrow-right text-white h-8 w-8 ml-2 rounded-full bg-black-color flex items-center justify-center -rotate-45"></i>
                </button>
            </div>
        </section>
    );
};

export default MovieRequestForm;
