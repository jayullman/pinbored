import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

import api from '../utils/api';
import '../styles/pinsContainer.css';

// displays modal to add pin information
class Modal_AddPin extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      urlField: ''
    };

    this.submitPin = this.submitPin.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.clearUrlField = this.clearUrlField.bind(this);
  }

  clearUrlField() {
    this.setState({ urlField: '' });
  }
  submitPin(event) {
    event.preventDefault();
    api.submitPin(this.state.urlField)
      .then(() => {
        this.props.loadAllPins();
      });
    this.clearUrlField();
    this.props.closeAddPinModal();
  }
  handleUrlChange(event) {
    const value = event.target.value;

    this.setState({ urlField: value });
  }
  handleCancel(event) {
    event.preventDefault();
    this.clearUrlField();
    this.props.closeAddPinModal();
  }

  render() {
    return (
      <div onClick={this.handleCancel} className='overlay'>
        <div className='modal-addPin'>
          <h3>Enter a url to a valid image file</h3>
          <form>
            <input 
              className='url-pin-input'
              placeholder='Image URL' 
              value={this.state.urlField}
              onChange={this.handleUrlChange} />
            <button className='button' onClick={this.submitPin}>Submit</button>
            <button className='button' onClick={this.handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

Modal_AddPin.propTypes = {
  closeAddPinModal: PropTypes.func.isRequired,
  loadAllPins: PropTypes.func.isRequired
};

// component returns a pin
class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      numberOfLikes: this.props.likes.length
    };

    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    // see if user is among the likes array, set isLiked to true if user has already
    // liked this pin
    if (this.props.likes.indexOf(Number(this.props.userId)) !== -1) {
      this.setState({ isLiked: true });
    }
  }

// TODO: change this so setstate accepts function instead of object
  handleLikeClick() {
    if (this.state.isLiked) {
      this.setState({ 
        isLiked: false,
        numberOfLikes: this.state.numberOfLikes - 1
      });
    } else {
      this.setState({
        isLiked: true,
        numberOfLikes: this.state.numberOfLikes + 1
      });
    }
    this.props.likePin();
  }
  render() {
    return (
      <div className='pin'>
        <img src={this.props.imageUrl} />

        {/* ensure delete button is only added when the user is logged in 
        and it is the user's pin */}
        {this.props.isLoggedIn && (Number(this.props.userId) === this.props.uploadedBy) &&
        <i onClick={this.props.deletePin} className="fa fa-times-circle delete-button" aria-hidden="true"></i>}
        
        <div className='like-container'>
          {/* display hallow heart button if the user has not liked this pin yet*/}
          {this.props.isLoggedIn && !this.state.isLiked 
            && <i onClick={this.handleLikeClick} className="heart-like-button fa fa-heart-o" aria-hidden="true"></i>}
          {/* display filled in heart button if the user has already liked this pin */}
          {this.props.isLoggedIn && this.state.isLiked 
            && <i onClick={this.handleLikeClick} className="heart-like-button fa fa-heart" aria-hidden="true"></i>}
          <span className='like-count'>{this.state.numberOfLikes}</span>
        </div>
        
      </div>
    );
  }
}

Pin.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  uploadedBy: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  deletePin: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  likePin: PropTypes.func.isRequired
};

class PinsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPins: [],
      showAddPinModal: false
    };

    this.showAddPinModal = this.showAddPinModal.bind(this);
    this.closeAddPinModal = this.closeAddPinModal.bind(this);
    this.loadAllPins = this.loadAllPins.bind(this);
    this.deletePin = this.deletePin.bind(this);
    this.likePin = this.likePin.bind(this);
  }

  componentDidMount() {
    // load all pins from database
    this.loadAllPins();
  }

  componentWillReceiveProps() {
    this.setState({ allPins: [] }, () => {
      this.loadAllPins();
    });
  }

  showAddPinModal() {
    this.setState({ showAddPinModal: true });
  }
  closeAddPinModal() {
    this.setState({ showAddPinModal: false });    
  }

  // Load Masonry.js layout once all images have loaded
  loadAllPins() {
    console.log('loading all pins');
    api.getAllPins.call(this)
      .then(() => {
        ////////////////////////////////////////////
        //    MASONRY.JS INITIALIZATION
        ////////////////////////////////////////////

        /**
         * Article: https://github.com/desandro/masonry/issues/236
         * used to ensure that masonry reloads after the route changes
         */
        const msnry = new Masonry(this.grid, {
          // options
          itemSelector: '.pin',
          isInitLayout: false
          // columnWidth: 250
        });
        
        imagesLoaded(this.grid).on('progress', () => {
          // layout Masonry after each image loads
          msnry._isLayoutInited = true;
          msnry.layout();
        });
      });
  }
  deletePin(pinId) {
    api.deletePin(pinId)
      .then((response) => {
        console.log(response);
        this.loadAllPins();
      });
  }
  likePin(pinId) {
    api.likePin(pinId, this.props.userId)
      .then((response) => {
        console.log(response);
        this.loadAllPins();
      });
  }

  render() {
    const { userId, isLoggedIn } = this.props;
    const pathname = this.props.location.pathname;
    let filteredPins;

    // filter pins based on the route
    if (pathname === '/allpins') {
      filteredPins = this.state.allPins;
    } else if (pathname === '/mypins') {
      filteredPins = this.state.allPins.filter(pin => pin.uploadedBy === Number(userId));
    } else if (pathname === '/likedpins') {
      filteredPins = this.state.allPins.filter(pin => pin.likes.indexOf(Number(userId)) !== -1);
    }

    return (
      <div className='outer-pins-container'>
        <h2>{pathname === '/allpins' ? 'Pins from all users'
          : pathname === '/mypins' ? 'My Pins' : 'Your Liked Pins'}</h2>
        <button onClick={this.showAddPinModal} className='add-pin-button button'>
          Add A Pin <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        </button>
        <div
          ref={(grid) => { this.grid = grid; }}
          className='masonry-grid'>
          {this.state.showAddPinModal &&
            <Modal_AddPin
              closeAddPinModal={this.closeAddPinModal}
              loadAllPins={this.loadAllPins} />}

          {filteredPins.map((pin, index) =>
            <Pin
              key={pin.imageUrl + index}
              imageUrl={pin.imageUrl}
              isLoggedIn={isLoggedIn}
              deletePin={this.deletePin.bind(null, pin._id)}
              userId={userId}
              uploadedBy={pin.uploadedBy}
              likePin={this.likePin.bind(null, pin._id)}
              likes={pin.likes} />
          )}
        </div>
      </div>
    );
  }
}

PinsContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

export default PinsContainer;