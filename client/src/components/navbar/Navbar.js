import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineFire,
  AiOutlineStar,
} from 'react-icons/ai';
import { GiPopcorn } from 'react-icons/gi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { handleLogoutUser } from '../../features/user/userSlice';
// import { logoutRequest } from '../../store/user/actions';

const Navbar = (props) => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(user);

  const handleLogout = async () => {
    dispatch(handleLogoutUser());
    // props.dispatch(logoutRequest());
    navigate('accounts/login');
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <nav
      className={
        scrolled
          ? 'navbar navbar-expand-lg fixed-top movienest-navbar scrolled'
          : 'navbar navbar-expand-lg fixed-top movienest-navbar'
      }
    >
      <div className='container-fluid movienest-container'>
        <NavLink className='navbar-brand' to='/'>
          MovieNest
        </NavLink>
        <button
          className='navbar-toggler toggler-button'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'>
            <AiOutlineMenu />
          </span>
        </button>
        <div
          className='collapse navbar-collapse movienest-collapse-menu'
          id='navbarSupportedContent'
        >
          {user && (
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 movienest-ul'>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  aria-current='page'
                  to='/dashboard'
                >
                  <AiOutlineFire size={22} /> Trending Movies
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  aria-current='page'
                  to='/candystore'
                >
                  <GiPopcorn size={22} /> My Snacks
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link ' to='/favorites'>
                  <AiOutlineStar size={22} /> Favorites
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/watchlist'>
                  <BsBookmarkHeart size={22} /> My WatchList
                </NavLink>
              </li>
            </ul>
          )}
          <ul className='navbar-nav mb-5 mb-lg-1'>
            {user && (
              <li className='nav-item dropdown account-dropdown'>
                <Link
                  className='nav-link dropdown-toggle dropdown-link'
                  to='#'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <span className='account-wrapper'>
                    {user.username}
                    <img
                      className='profile-picture ms-1'
                      alt='profile'
                      src='/images/profile.png'
                    />
                  </span>
                </Link>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link className='dropdown-item' to='/profile'>
                      <div className='d-flex align-items-center'>
                        <AiOutlineUser />
                        <span className='ms-1'>Profile</span>
                      </div>
                    </Link>
                  </li>
                  <li className='p-2 logout-item'>
                    <button
                      className='nav-link nav-link-btn p-2'
                      onClick={handleLogout}
                    >
                      <div className='d-flex align-items-center'>
                        <AiOutlineLogout />
                        <span className='ms-1'>Logout</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
            )}
            {!user && (
              <li className='nav-item'>
                <button className='nav-link nav-link-btn'>
                  <Link to='accounts/login'>
                    <AiOutlineUser />
                    <span className='ms-1'>Login</span>
                  </Link>
                </button>
              </li>
            )}
            {!user && (
              <li className='nav-item'>
                <button className='nav-link nav-link-btn'>
                  <Link to='accounts/register'>
                    <AiOutlineUserAdd />
                    <span className='ms-1'>Sign up</span>
                  </Link>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.user.user,
//     token: state.user.authenticationToken,
//     error: state.user.error,
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

export default Navbar;
