import User from '../models/user.js';
import mongoose from 'mongoose';
// import Movie from '../models/movie.js';

// Get a single user
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMessage: 'No such user found!' });
  }
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ errorMessage: 'No such user found!' });
  }
  res.status(200).json(user);
};

export const addFavMovie = async (req, res) => {
  try {
    const newMovieToFav = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $push: { favoritesList: newMovieToFav } },
      { new: true }
    );

    //If you wanna use the movie schema instead, which is ideal-->
    // await Movie.create({
    //   user: req.user,
    //   title: req.body.original_title,
    //   overview: req.body.overview,
    //   vote_average: req.body.vote_average,
    //   poster_path: req.body.poster_path,
    // });
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const removeFavMovie = async (req, res) => {
  try {
    const removeMovie = req.body.id;
    console.log(req.user);
    console.log(removeMovie);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $pull: { favoritesList: { id: removeMovie } } },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const getUserFav = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const favList = user.favoritesList;
    return res.status(200).json(favList);
  } catch (err) {
    console.log(err);
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const newMovieToWatchlist = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $push: { watchlist: newMovieToWatchlist } },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchlist = async (req, res) => {
  try {
    const removeMovie = req.body.id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $pull: { watchlist: { id: removeMovie } } },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const getUserWatchlist = async (req, res) => {
  console.log('getWatchlist->', req.user);
  try {
    const user = await User.findById(req.user);
    const userWatchlist = user.watchlist;
    return res.status(200).json(userWatchlist);
  } catch (err) {
    console.log(err);
  }
};
