import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Function
export const Login = async (req, res) => {
    try {
        console.log("Login endpoint hit");

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Missing email or password");
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        console.log("Searching for user by email");
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        console.log("Comparing provided password with stored password");
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            console.log("Passwords do not match");
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const tokenData = { id: user._id };
        console.log("Generating JWT token");
        const token = jwt.sign(tokenData, "your_secret_key", { expiresIn: "1h" });

        console.log("Sending response with token");
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });

    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Logout Function
export const Logout = async (req, res) => {
    try {
        console.log("Logout endpoint hit");
        return res.status(200).cookie("token", "", { expires: new Date(0), httpOnly: true }).json({
            message: "User logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error in Logout:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Register Function
export const Register = async (req, res) => {
    try {
        console.log("Register endpoint hit");

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            console.log("Missing fullName, email, or password");
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        console.log("Checking if email is already registered");
        const user = await User.findOne({ email });

        if (user) {
            console.log("Email already in use");
            return res.status(401).json({
                message: "This email is already used",
                success: false
            });
        }

        console.log("Hashing the password");
        const hashedPassword = await bcryptjs.hash(password, 16);

        console.log("Creating new user");
        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        console.log("User registered successfully");
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.error("Error in Register:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};