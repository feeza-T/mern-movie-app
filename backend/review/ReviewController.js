import {Review} from "../models/reviewModel.js";

export const saveReview = async (req, res) => {
    console.log("Received review data:", req.body); // Log incoming data
    const { userName, text, rating } = req.body;

    // Ensure required fields are present
    if (!userName || !text || !rating) {
        return res.status(400).json({ message: 'User name, text, and rating are required.' });
    }

    try {
        // Create a new review instance
        const newReview = new Review({
            userName,
            text,
            rating,
        });

        // Save the review to the database
        await newReview.save();

        // Respond with the saved review
        res.status(201).json({
            message: 'Review saved successfully!',
            data: newReview
        });
    } catch (error) {
        console.error('Error saving review:', error);

        // Check for validation errors from mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        // General error handler
        res.status(500).json({ message: 'Error saving review', error });
    }
};




// Get all reviews
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }); // Get reviews, sorted by newest
        console.log("reviews from bcakend" , reviews);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};

