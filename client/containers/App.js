import React from 'react';
// import axios from 'axios';
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
      twitterId: ''
    };
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    api.checkIfLoggedIn()
      .then((isLoggedIn) => {
        this.setState({ isLoggedIn });
        // retrieve user's twitter id if logged in
        if (isLoggedIn) {
          api.getUsersTwitterId.call(this);
        }
      });
  }

  authenticate() {
    window.location.href = '/auth/twitter';
  }

  render() {
    const AllPins = props => (
      <PinsContainer 
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        {...props}
      />
    );

    const MyPins = props => (
      <PinsContainer
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        {...props}        
      />
    );

    const LikedPins = props => (
      <PinsContainer
        isLoggedIn={this.state.isLoggedIn}
        userId={this.state.twitterId}
        {...props}
      />
    );

    return (
      <div className='app-container'>
        <div className='content'>
          <NavContainer />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/allpins' render={AllPins} />
            <Route path='/mypins' render={MyPins} />
            <Route path='/likedpins' render={LikedPins} />
          </Switch>

          <div>Hello from React!</div>
          <button onClick={this.authenticate}></button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;