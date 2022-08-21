import React, { useEffect } from 'react';
import './watchlist.css';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../../components/movieCard/MovieCard';
import { handleGetWatchlist } from '../../features/user/userSlice';
import EmptyCard from '../../components/emptyCard/EmptyCard';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { isLoading, watchlist } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(handleGetWatchlist());
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

  if (watchlist.length === 0) {
    return <EmptyCard />;
  }

  let renderedWatchList = null;
  renderedWatchList = watchlist?.map((movie) => {
    return <MovieCard key={movie.id} movieData={movie} movieId={movie.id} />;
  });

  return (
    <div className='watchlist'>
      <div className='wl_wrapper'>
        <h3 className='wl_title'>Trending Movies</h3>
        <div className='wl_movies'>{renderedWatchList}</div>
      </div>
    </div>
  );
};

export default Watchlist;
