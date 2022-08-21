import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import {
  handleAddToFav,
  handleRemoveFav,
  handleAddToWatch,
  handleRemWatchlist,
} from '../../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

import './MovieCard.css';

const MovieCard = (props) => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((store) => store.movies);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false);

  const notify = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();

  const findMovieBasedOnId = (id) => {
    let foundMovie = movieList.find((movie) => movie.id === id);
    return foundMovie;
  };

  const handleAddToFavorite = (id) => {
    let movie = findMovieBasedOnId(id);
    dispatch(handleAddToFav(movie));
    notify('Added to Favorites');
  };

  const handleRemoveFavorite = (id) => {
    let movie = findMovieBasedOnId(id);
    dispatch(handleRemoveFav(movie));
    notify('Removed from Favorites');
  };
  const handleAddToWatchList = (id) => {
    let movie = findMovieBasedOnId(id);
    dispatch(handleAddToWatch(movie));
    notify('Added to Watchlist');
  };

  const handleRemoveFromWatchlist = (id) => {
    let movie = findMovieBasedOnId(id);
    dispatch(handleRemWatchlist(movie));
    notify('Removed from Watchlist');
  };

  const alreadyInFav = (movieId) => {
    let favs = user?.favoritesList?.find((m) => m.id === movieId);
    return favs?.id;
  };

  const alreadyInWatch = (movieId) => {
    let inWatch = user?.watchlist?.find((m) => m.id === movieId);
    return inWatch?.id;
  };

  const handleLearnMore = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <article className='moviecard'>
      <div className='card_header'>
        <div className='card_add_to'>
          {alreadyInWatch(props.movieId) === props.movieId ? (
            <p
              onClick={() => handleRemoveFromWatchlist(props.movieId)}
              className='add_to_watch'
            >
              Remove from Watchlist
            </p>
          ) : (
            <p
              onClick={() => handleAddToWatchList(props.movieId)}
              className='add_to_watch'
            >
              Add to Watchlist
            </p>
          )}
        </div>
        {location && location.pathname === '/favorites' ? (
          <div
            className='card_add_to'
            onClick={() => handleRemoveFavorite(props.movieId)}
          >
            <p className='add_to_icon'>
              <BsTrash size={30} />
            </p>
          </div>
        ) : (
          <div className='card_add_to'>
            <p className='add_to_icon'>
              {alreadyInFav(props.movieId) === props.movieId ? (
                <AiFillStar
                  size={30}
                  onClick={() => handleRemoveFavorite(props.movieId)}
                />
              ) : (
                <AiOutlineStar
                  size={30}
                  onClick={() => handleAddToFavorite(props.movieId)}
                />
              )}
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
      <div className='card_img'>
        <img
          className='card_movie_poster'
          src={`${IMAGE_URL}${props.movieData.poster_path}`}
          alt='movie poster'
        />
      </div>

      <div className='card_content'>
        <div className='card_title_container'>
          <h1 className='card_title'>{props.movieData.original_title}</h1>
        </div>
        <div className='card_desc_container'>
          <h2 className='card_desc'>
            {readMore
              ? props?.movieData?.overview
              : `${props?.movieData?.overview?.substring(0, 140)}...`}
            <button
              className='btn_read_more'
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? 'show less' : 'show more'}
            </button>
          </h2>
        </div>
      </div>
      <div className='card_footer'>
        <div>
          <button
            className='btn_learn_more'
            onClick={() => handleLearnMore(props.movieId)}
          >
            Learn More
          </button>
        </div>
        <div className='rating_container'>
          <p className='card_rating_icon'>{props.movieData.vote_average}</p>
        </div>
      </div>
      {/* <div className='card'>
        <img src={`${IMAGE_URL}${props.movieData.poster_path}`} />
        <div className='descriptions'>
          <h1>{props.movieData.original_title}</h1>
          <p>{props?.movieData?.overview}</p>
          <button>
            <i className='fab fa-youtube'></i>
            Play trailer on YouTube
          </button>
        </div>
      </div> */}
    </article>
  );
};

export default MovieCard;
