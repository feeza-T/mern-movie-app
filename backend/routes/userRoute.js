import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";
import { authenticateUser } from "../middlewire/authenticateUser.js";
import { NowPlaying } from "../movieData/controllerMovie.js";


const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get( Logout); 
router.route('/movies').post(NowPlaying);


export default router;
