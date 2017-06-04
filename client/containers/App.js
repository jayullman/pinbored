import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NavContainer from './NavContainer';
import PinsContainer from './PinsContainer';
import Footer from '../components/Footer';
import Home from '../components/Home';
import api from '../utils/api';
import '../styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      twitterId: '',
      twitterUsername: '',
      profileImageUrl: ''
    };
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    api.checkIfLoggedIn()
      .then((isLoggedIn) => {
        this.setState({ isLoggedIn });
        // retrieve user's twitter id if logged in
        if (isLoggedIn) {
          api.getUsersTwitterInfo.call(this);
        }
      });
  }

  authenticate() {
    window.location.href = '/auth/twitter';
  }

  logout() {
    api.logout()
      .then((logOutSuccess) => {
        // if logout was successful, redirect to home page
        if (logOutSuccess) {
          this.context.router.history.push('/');
          this.setState({ isLoggedIn: false });
        }
      });
  }

  render() {
    const AllPins = props => (
      <PinsContainer 
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        username={this.state.twitterUsername}
        {...props}
      />
    );

    const MyPins = props => (
      <PinsContainer
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        username={this.state.twitterUsername}
        {...props}        
      />
    );

    const LikedPins = props => (
      <PinsContainer
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        username={this.state.twitterUsername}
        {...props}
      />
    );

    return (
      <div className='app-container'>
        <div className='content'>
          <NavContainer
            isLoggedIn={this.state.isLoggedIn}
            login={this.authenticate}
            logout={this.logout}
            profileImageUrl={this.state.profileImageUrl} />
          <Switch>
            <Route exact path='/' render={() => 
              <Home login={this.authenticate} />
            }/>
            <Route path='/allpins' render={AllPins} />
            <Route path='/mypins' render={MyPins} />
            <Route path='/likedpins' render={LikedPins} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object
};

export default App;