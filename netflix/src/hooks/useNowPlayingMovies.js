import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movie, options } from "../utils/constant";
import { useDispatch } from "react-redux";

const useNowPlayingMovies = async () => {
    const dispatch = useDispatch();
    
    try {
        // Fetch now-playing movies from the external API
        const res = await axios.get(Now_Playing_Movie, options);
        const movies = res.data.results;

        // Send the received data to your API to be saved in MongoDB
        await axios.post('/api/movies/addMovies', movies); // Assuming your route is /api/movies/addMovies

        // Dispatch the data to Redux after saving it to MongoDB
        dispatch(getNowPlayingMovies(movies));

        console.log('Movies fetched and saved successfully:', movies);
    } catch (error) {
        console.log('Error while fetching or saving movies:', error);
    }
}

export default useNowPlayingMovies;
