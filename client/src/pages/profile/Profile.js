import React from 'react';
import './profile.css';
import { useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <section className='profile_page'>
      <article className='profile_container'>
        <div className='name_container'>
          <h1 className='profile_name'>{user?.username}</h1>
        </div>
        <div className='profile_img_container'>
          <img
            className='profile_photo'
            src='/images/profile.png'
            alt={user?.username}
          />
        </div>
        <div className='member_date_container'>
          <p className='since_date'>
            Joined: {format(parseISO(user?.createdAt), 'PPP')}
          </p>
          <p className='since_date'>
            Membership length: {formatDistanceToNow(parseISO(user?.createdAt))}
          </p>
        </div>
        <div className='profile_movie_list_container'></div>
        <div className='profile_fav_container'>
          <p className='profile_fav_movies'>
            Favourite Movies {user?.favoritesList.length} Go to{' '}
            <NavLink to='/favorites'>Favorites</NavLink>
          </p>
        </div>
        <div className='profile_watchlist_container'>
          <p className='profile_watchlist_movies'>
            In watchlist {user?.watchlist.length}{' '}
            <NavLink to='/watchlist'>Watchlist</NavLink>
          </p>
        </div>
      </article>
    </section>
  );
};

export default Profile;
