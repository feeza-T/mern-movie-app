import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
    path: ".env",
});

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Ensure this URL is correctly set
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-refresh-token", // Add your custom header here
    exposedHeaders: "Set-Cookie,x-new-token", // Expose any custom headers you want to access on the client
};


app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.get("/", (req, res) => res.send("hello world"));

// Add Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});