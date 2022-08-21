import express from 'express';
import auth from '../middleware/auth.js';

import {
  isAuthenticated,
  loginUser,
  logoutUser,
} from '../controllers/authUserController.js';
import { registerUser } from '../controllers/registerUserController.js';
import {
  getUser,
  getUserFav,
  addFavMovie,
  removeFavMovie,
  addToWatchlist,
  removeWatchlist,
  getUserWatchlist,
} from '../controllers/userController.js';

const router = express.Router();

// GET all users

// GET a single user
router.get('/user/:id', getUser);

// POST(Create) a new user
router.post('/register', registerUser);

// DELETE a user
// router.delete('/:id', )

// LOGIN USER ROUTE
router.post('/login', loginUser);

// LOGOUT USER ROUTE
router.get('/logout', logoutUser);

// VerifyToken Route
router.get('/authenticated', isAuthenticated);

//Favorites
router.get('/user-favorites', auth, getUserFav);
router.post('/add-fav-movie', auth, addFavMovie);
router.put('/remove-fav-movie', auth, removeFavMovie);

//Add a movie to watchlist
router.post('/add-to-watchlist', auth, addToWatchlist);

//Remove movie from watchlist
router.put('/remove-watchlist', auth, removeWatchlist);

//Get all watchlist
router.get('/get-user-watchlist', auth, getUserWatchlist);

export default router;
