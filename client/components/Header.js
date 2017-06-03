/**
 * This componenet will return a hero header for the home page and a smaller header
 * for any other page based on props.match.isExact
 */
import React from 'react';

import '../styles/header.css';

const Header = props => (
  <header>
    <div className='hero-header'>
      <h1>PinBored</h1>
      <h3>...because time is for wasting</h3>
      <i className="fa fa-chevron-down fa-3x down-arrow" aria-hidden="true"></i>
    </div>
  </header>
);
  
export default Header;
