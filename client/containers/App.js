import React from 'react';
// import axios from 'axios';
import PinsContainer from './PinsContainer';
import Footer from '../components/Footer';
import api from '../utils/api';
import '../styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    api.checkIfLoggedIn()
      .then((isLoggedIn) => {
        this.setState({ isLoggedIn });
      });
  }

  authenticate() {
    window.location.href = '/auth/twitter';
  }

  render() {
    return (
      <div className='app-container'>
        <div className='content'>
          <div>Hello from React!</div>
          <button onClick={this.authenticate}></button>
          <PinsContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;