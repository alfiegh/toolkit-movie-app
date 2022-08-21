/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import ReusablePagination from '../../components/pagination/ReusablePagination';
import './Dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from '../../features/movies/movieSlice';
// import { handleGetFav } from '../../features/user/userSlice';
// PDP Project -->

const Dashboard = () => {
  const dispatch = useDispatch();
  const { movieList, isLoading, currentPage, numOfPages } = useSelector(
    (store) => store.movies
  );
  const [currentPageNum, setCurrentPageNum] = useState(currentPage);

  useEffect(() => {
    dispatch(getMovies(currentPageNum));
  }, [currentPageNum]);

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner-border text-warning my-spinner' role='status'>
          <span className='sr-only'></span>
        </div>
      </div>
    );
  }

  if (movieList.length === 0) {
    return (
      <div className='alert alert-danger' role='alert'>
        A simple danger alert—check it out!
      </div>
    );
  }

  let movies = null;
  movies = movieList?.map((movie) => {
    return <MovieCard key={movie.id} movieData={movie} movieId={movie.id} />;
  });

  return (
    <div className='dashboard_home'>
      <div className='dashboard_wrapper'>
        <h3 className='dashboard-trending'>Trending Movies</h3>
        <div className='dashboard_movies'>{movies}</div>
      </div>
      <ReusablePagination
        // currentPageNum={currentPageNum}
        setCurrentPageNum={setCurrentPageNum}
        currentPage={currentPage}
        numOfPages={numOfPages}
      />
    </div>
  );
};

export default Dashboard;
