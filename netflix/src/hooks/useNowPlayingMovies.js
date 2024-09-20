import axios from "axios";

import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movie, options } from "../utils/constant";
import {useDispatch} from "react-redux";
import nowPlayingData from "../movieData/NowPlaying";

const useNowPlayingMovies = async () => {
    const dispatch = useDispatch();
    try {

        console.log(nowPlayingData);
        
//  axios.post(`${API_END_POINT}/movies`, nowPlayingData)
// .then(response => console.log('Movies saved:', response.data))
// .catch(error => console.error('Error saving movies:', error));


        const res = await axios.get(Now_Playing_Movie, options);
        dispatch(getNowPlayingMovies(res.data.results));
        console.log(res.data.results);

    } catch (error) {
        console.log(error);
    }
}
export default useNowPlayingMovies;