import React, { useEffect } from 'react';
import './favorites.css';
import MovieCard from '../../components/movieCard/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetFav } from '../../features/user/userSlice';
import EmptyCard from '../../components/emptyCard/EmptyCard';

const Favorites = (props) => {
  const dispatch = useDispatch();
  const { favoritesList, isLoading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(handleGetFav());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner-border text-warning my-spinner' role='status'>
          <span className='sr-only'></span>
        </div>
      </div>
    );
  }

  if (favoritesList.length === 0) {
    return <EmptyCard />;
  }

  let favorites = null;
  favorites = favoritesList?.map((movie) => {
    return <MovieCard key={movie.id} movieData={movie} movieId={movie.id} />;
  });

  return (
    <div className='favorites'>
      <div className='fav_wrapper'>
        <h3 className='fav_title'>Trending Movies</h3>
        <div className='fav_movies'>{favorites}</div>
      </div>
    </div>
  );
};

export default Favorites;
