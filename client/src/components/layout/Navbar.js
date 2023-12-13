import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar({ title, icon }) {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  let profileUrl = "/profile/";
  if(user) {
    profileUrl = profileUrl + user._id.toString();
  }
  
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearContacts(contactDispatch);
    setAnchorEl(null);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const authLinks = (

    <Fragment>
      <Link to='/feed'>Feed</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <div>
        <Button
          style={{color: '#003699', fontFamily: 'Montserrat', padding:'8px 8px 0 8px'}}
          onClick={handleClick}
        >
          Hello, {user && user.name}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem>
            <i className='fas fa-user' />{' '}
            <Link to={profileUrl}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={onLogout}>
            <i className='fas fa-sign-out-alt' />{' '}
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <h1>
        <Link to='/'>
        <i class="fas fa-solid fa-book"></i> College Colab
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}

export default Navbar;