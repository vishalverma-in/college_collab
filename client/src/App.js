import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Feed from './components/pages/Feed';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import FeedState from './context/feed/FeedState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
import Post from './components/pages/Post';
import Profile from './components/pages/Profile';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <FeedState>
          <AlertState>
            <BrowserRouter>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Routes>
                    <Route path='dashboard' element={<PrivateRoute component={Home} />} />
                    <Route path='about' element={<About />} />
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                    <Route path='feed' element={<PrivateRoute component={Feed} />} />
                    <Route path='/' element={<PrivateRoute component={Feed} />} />
                    <Route path='feed/:id' element={<Post />} />
                    <Route path='profile/:id' element={<Profile />} />
                  </Routes>
                </div>
              </Fragment>
            </BrowserRouter>
          </AlertState>
        </FeedState>
      </ContactState>
    </AuthState>
  );
};

export default App;
