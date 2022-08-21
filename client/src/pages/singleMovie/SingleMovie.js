import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMovie } from '../../features/movies/movieSlice';
import './singleMovie.css';
import { formatDistanceToNow, parseISO, format } from 'date-fns';

const SingleMovie = () => {
  const url = useParams();
  const dispatch = useDispatch();
  const { singleMovie } = useSelector((store) => store.movies);

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  console.log(singleMovie);

  useEffect(() => {
    dispatch(getSingleMovie(url.id));
  }, [dispatch]);

  const {
    poster_path,
    title,
    overview,
    genres,
    homepage,
    production_companies,
    release_date,
    runtime,
    vote_average,
  } = singleMovie;

  //   const findLogo = (arr) => {
  //     return arr.map((item) => item.logo_path).filter((item) => item !== null);
  //   };

  //   console.log(findLogo(production_companies));

  return (
    <article className='sm_container'>
      <div className='sm_wrapper'>
        <div className='sm_img_container'>
          <img src={`${IMAGE_URL}${poster_path}`} />
        </div>
        <div className='sm_data_container'>
          <div className='sm_title_container'>
            <h1>{title}</h1>
          </div>
          <div className='sm_genres_container'>
            <ul>{genres && genres.map((g) => <li id={g.id}>{g.name}</li>)}</ul>
          </div>
          <div className='sm_overview_container'>
            <p>{overview}</p>
          </div>
          <div className='sm_production_container'>
            <h2>
              {(production_companies && production_companies[0]?.name) ||
                'No Data Available'}
            </h2>
            <img
              src={
                `${IMAGE_URL}${
                  production_companies && production_companies[0]?.logo_path
                }` || 'No Logo Available'
              }
            />
          </div>
          {/* <div className='sm_g_p'> */}
          {/* </div> */}
          <div className='sm_release_date_container'>
            <p>
              Released {release_date && format(parseISO(release_date), 'PPP')}
            </p>
          </div>
          <div className='sm_runtime_container'>
            <p>Runtime: {runtime} mins</p>
          </div>
          <div className='sm_vote_container'>
            <p>Rating {Math.round(vote_average * 10) / 10}</p>
          </div>
          <div className='sm_homepage_container'>
            <a target='blank' href={homepage}>
              Visit movie homepage
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleMovie;
