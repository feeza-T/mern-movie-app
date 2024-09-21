import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";
import { NowPlaying } from "../movieData/controllerMovie.js";
import { nowPlayingData } from "../movieData/fetchMovie.js";
import { authenticateUser } from "../middlewire/authenticateUser.js";
import { getReviews, saveReview } from "../review/ReviewController.js";
// Adjust the import based on your file structure

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route('/movies').post(NowPlaying);
router.route('/moviesData').put(authenticateUser, nowPlayingData); // Protect this route

// Route to save a review
router.post('/saveReviews', saveReview);

// Route to get all reviews
router.get('/getReviews', getReviews);
export default router;

