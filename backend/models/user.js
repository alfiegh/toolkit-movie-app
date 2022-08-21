import mongoose from 'mongoose';
import movieSchema from './movie.js';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: (username) => username.length > 4,
        message: 'Username must be longer than 4 characters',
      },
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePic: {
      type: String,
      default: '/images/profile.png',
    },
    favoritesList: [],
    watchlist: [],
  },
  { timestamps: true }
);

export default mongoose.model('user', userSchema);
