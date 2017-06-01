/**
 * This componenet will return a hero header for the home page and a smaller header
 * for any other page based on props.match.isExact
 */
import React from 'react';

import '../styles/header.css';

const Header = (props) => {
  return (
    <header>
      {/* If route is '/', display hero header */}
      {props.match.isExact 
        ? <div className='hero-header'>
            <h1>Hero Header: Pinterest Clone</h1>
          </div>
        : <div className='small-header'>
          <h1>Small Header: Pinterest Clone</h1>
        </div>}
    </header>
  );
};
  
export default Header;
