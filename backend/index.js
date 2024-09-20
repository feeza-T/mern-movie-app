import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

// Load environment variables
dotenv.config({
    path: ".env",
});

// Database connection
databaseConnection();

// Initialize express app
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Ensure this is correct and defined in Vercel's environment
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-refresh-token", // Ensure custom headers are allowed
    exposedHeaders: "Set-Cookie,x-new-token,Authorization", // Expose tokens or custom headers
};

// CORS middleware
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);

// Basic root route
app.get("/", (req, res) => res.send("hello world"));

// Remove the manual setting of Access-Control-Allow-Origin headers
// CORS middleware is already handling this

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
