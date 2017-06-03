import React from 'react';

import '../styles/header.css';

const Header = () => (
  <header>
    <div className='hero-header'>
      <h1>PinBored</h1>
      <h3>...because time is for wasting</h3>
      <i className="fa fa-chevron-down fa-3x down-arrow" aria-hidden="true"></i>
    </div>
  </header>
);
  
export default Header;
