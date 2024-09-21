import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
 
  text: {
    type: String,
    required: true,
    maxlength: 500,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

export { Review };
