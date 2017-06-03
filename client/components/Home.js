import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './Header';

import '../styles/home.css';

const Home = props =>
  (
    <div className='homepage'>
      <Header />
      <p>
        Welcome to PinBored, where you can pin interesting or funny images to a communal board
        (if you have nothing else better to do). If you see an interesting Pin,
        <i alt='like' className="heart-like-button fa fa-heart" aria-hidden="true"></i> it!. The
        little profile picture in the lower left corner of each pin is the profile image of the user
        who pinned the image. Click it to go to that user's twitter profile.
      </p>
      <p>
        You must first <span className='login-link' onClick={props.login}>log in</span> with twitter 
        to post your own Pins or to like other's Pins. You do not need to log in order to see other 
        users' Pins. Check them out <Link to='/allpins'>here</Link>. 
      </p>
    </div>
  );

Home.PropTypes = {
  login: PropTypes.func.isRequired
};

export default Home;
