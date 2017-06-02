import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../styles/navContainer.css';
/**
 * This component conditionally renders either a mobile nav or full-width
 * Navigation bar depending on the width of the browser.
 * Adapted from: https://www.davidmeents.com/blog/creating-a-collapsible-navigation-menu-in-react-js/
 */
class NavContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: false,
      isMenuOpen: false
    };
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  navLinks() {
    return (
      <ul>
        <li key={1}><NavLink exact activeClassName='active-link' to='/'>Home</NavLink></li>
        <li key={2}><NavLink activeClassName='active-link' to='/allpins'>All Pins</NavLink></li>
        {this.props.isLoggedIn && <li key={3}><NavLink activeClassName='active-link' to='/mypins'>My Pins</NavLink></li>}
        <li key={4}><NavLink activeClassName='active-link' to='/likedpins'>Liked Pins</NavLink></li>
        
        {!this.props.isLoggedIn 
          ? <li onClick={this.props.login} className='twitter-login' key={5}>
            Log in with <i className="fa fa-twitter" aria-hidden="true"></i>
          </li>
          : <li onClick={this.props.logout}>Signout</li>}
        
      </ul>
    );
  }

  // renderMobileNav() {
  //   if (this.state.mobileNavVisible) {
  //     return this.navLinks();
  //   }
  // }

  renderNavigation() {
    if (this.state.windowWidth <= 600) {
      return (
        <div className='narrow-nav'>
          <nav className='burger-menu'>
            <Menu width={200} isOpen={this.state.isMenuOpen}>
              {this.navLinks()}
            </Menu>
          </nav>
            {/* These items will appear outside of the burger menu */}
            <ul className='outside-burger-links'>
              <li><NavLink to='/'>Outside Burger Link</NavLink></li>
            </ul>
        </div>
      );
    }
    return (
      <nav className='wide-nav'>
        {this.navLinks()}
      </nav>
    );
  }

  render() {
    return (
      <div className='nav-container'>
        {this.renderNavigation()}
      </div>
    );
  }
}

NavContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default NavContainer;