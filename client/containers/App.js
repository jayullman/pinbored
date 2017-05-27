import React from 'react';
// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    window.location.href = '/auth/twitter';
  }

  render() {
    return (
      <div>
        <div>Hello from React!</div>
        <button onClick={this.authenticate}></button>
      </div>
    );
  }
}

export default App;