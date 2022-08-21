/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handlePersistLogin } from './features/user/userSlice';
import Navbar from './components/navbar/Navbar';
import axios from 'axios';
import parseJwt from './utils/parseJwt';
import PrivateRoute from './components/shared/privateRoute/PrivateRoute';
import CandyStore from './pages/snackList/SnackList';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
// import Footer from './components/footer/Footer';
import Homepage from './pages/homepage/Homepage';
import Favorites from './pages/favourites/Favorites';
import Watchlist from './pages/watchlist/Watchlist';
import Profile from './pages/profile/Profile';
import SingleMovie from './pages/singleMovie/SingleMovie';

axios.defaults.withCredentials = true;

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const findUser = async (id) => {
    dispatch(handlePersistLogin(id));
  };

  useEffect(() => {
    const token = document.cookie.split('token=').join('');
    if (token) {
      const userId = parseJwt(token);
      findUser(userId.user);
    }
  }, []);

  return (
    <>
      {pathname !== '/accounts/register' && pathname !== '/accounts/login' && (
        <Navbar />
      )}
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/accounts/register' element={<Signup />} />
        <Route path='/accounts/login' element={<Login />} />
        <Route path='/candystore' element={<CandyStore />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movie/:id' element={<SingleMovie />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
