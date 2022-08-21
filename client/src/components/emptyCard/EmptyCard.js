import React from 'react';
import './emptyCard.css';

const EmptyCard = () => {
  return (
    <article className='e_moviecard'>
      <div className='e_card_header'>
        <p>No movies to display</p>
      </div>
      <div className='e_card_img'>
        <img
          className='e_card_movie_poster'
          src='/images/profile.png'
          alt='default movie poster'
        />
      </div>

      <div className='e_card_content'>
        <h1 className='e_card_title'>Start browsing</h1>
        <h2 className='e_card_desc'>
          Check our trending movies and start adding them here!
        </h2>
      </div>
    </article>
  );
};

export default EmptyCard;
