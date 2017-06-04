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

  wideNavLinks() {
    return (
      <ul>
        <li key={1}><NavLink className='home-link' exact activeClassName='active-link' to='/'>Home</NavLink></li>
        <li key={2}><NavLink activeClassName='active-link' to='/allpins'>All Pins</NavLink></li>
        {this.props.isLoggedIn && <li key={3}><NavLink activeClassName='active-link' to='/mypins'>My Pins</NavLink></li>}
        {this.props.isLoggedIn && <li key={4}><NavLink activeClassName='active-link' to='/likedpins'>Liked Pins</NavLink></li>}
        {!this.props.isLoggedIn 
          ? <li onClick={this.props.login} className='twitter-login-link' key={5}>
            Log in with <i className="fa fa-twitter" aria-hidden="true"></i>
          </li>
          : <li className='logout-link' onClick={this.props.logout}>Sign out</li>}
        {this.props.isLoggedIn && this.props.profileImageUrl && 
        <li><img className='nav-profile-img' src={this.props.profileImageUrl}/></li>}      
      </ul>
    );
  }

  /* These items will appear outside of the burger menu when screen is small */ 
  narrowNavLinks() {
    return (
      <ul className='outside-burger-links'>
        <li key={2}><NavLink activeClassName='active-link' to='/allpins'>All Pins</NavLink></li>
        {this.props.isLoggedIn && <li key={3}><NavLink activeClassName='active-link' to='/mypins'>My Pins</NavLink></li>}
        {this.props.isLoggedIn && <li key={4}><NavLink activeClassName='active-link' to='/likedpins'>Liked Pins</NavLink></li>}
        {!this.props.isLoggedIn && <li onClick={this.props.login} className='twitter-login-link' key={5}>Log in</li>}
      </ul>
    );
  }

  burgerNavLinks() {
    return (
      <ul>
        {this.props.isLoggedIn && this.props.profileImageUrl &&
          <li><img className='nav-profile-img-burger' src={this.props.profileImageUrl} /></li>}
        <li key={1}><NavLink className='home-link' to='/'>Home</NavLink></li>
        {this.props.isLoggedIn && <li className='logout-link' onClick={this.props.logout}>Sign out</li>}
      </ul>
    ); 
  }

  renderNavigation() {
    if (this.state.windowWidth <= 600) {
      return (
        <div className='narrow-nav'>
          <nav className='burger-menu'>
            <Menu width={150} isOpen={this.state.isMenuOpen}>
              {this.burgerNavLinks()}
            </Menu>
          </nav>
          {this.narrowNavLinks()}
        </div>
      );
    }
    return (
      <nav className='wide-nav'>
        {this.wideNavLinks()}
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
  logout: PropTypes.func.isRequired,
  profileImageUrl: PropTypes.string.isRequired
};

export default NavContainer;