import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <li key={1}><Link to='/'>Home</Link></li>
        <li key={2}><Link to='/allpins'>All Pins</Link></li>
        {this.props.isLoggedIn && <li key={3}><Link to='/mypins'>My Pins</Link></li>}
        <li key={4}><Link to='/likedpins'>Liked Pins</Link></li>
        
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
    if (this.state.windowWidth <= 200) {
      return (
        <nav className='burger-menu'>
          <Menu width={200} isOpen={this.state.isMenuOpen}>
            {this.navLinks()}
          </Menu>
        </nav>
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