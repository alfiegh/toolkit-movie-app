import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <ul className='footer-links mt-2'>
        <Link to='/'>Home</Link>
        <Link to='#'>About</Link>
        <Link to='#'>History</Link>
        <Link to='#'>Cookies</Link>
        <Link to='#'>Developer</Link>
        <Link to='#'>API</Link>
        <Link to='#'>Terms</Link>
        <Link to='#'>Privacy</Link>
      </ul>
      <div>
        <p className='footer-copyright-text'>© 2022 MovieNest from Giorgi</p>
      </div>
    </footer>
  );
};

export default Footer;
