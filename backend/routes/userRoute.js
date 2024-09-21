import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";
import { NowPlaying } from "../movieData/controllerMovie.js";
import { nowPlayingData } from "../movieData/fetchMovie.js";
import { authenticateUser } from "../middlewire/authenticateUser.js";
import { popularMovieController } from "../movieData/popularMovieController.js";
import { fetchPopularData } from "../movieData/fetchPopularMovie.js";

// For CommonJS import


// Adjust the import based on your file structure

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route('/movies').post(NowPlaying);
router.route('/moviesData').put(authenticateUser, nowPlayingData);
router.route('/popularMovies').post(popularMovieController); // Protect this route
router.route('/popularMovieData').post(authenticateUser,fetchPopularData);
export default router;
