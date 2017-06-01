import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import api from '../utils/api';
import '../styles/pinsContainer.css'

const AddPinBox = (props) => {
  return (
    <div className='add-pin-box'>
      <button onClick={props.showAddPinModal}>Add Pin</button>
    </div>
  );
}

AddPinBox.propTypes = {
  showAddPinModal: PropTypes.func.isRequired
};

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
      .then((response) => {
        console.log(response);
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
      <div className='overlay'>
        <div className='modal-addPin'>
          <form>
            <input 
              placeholder='Image URL' 
              value={this.state.urlField}
              onChange={this.handleUrlChange} />
            <button onClick={this.submitPin}>Submit</button>
            <button onClick={this.handleCancel}>Cancel</button>
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
const Pin = (props) => {
  return (
    <div className='pin'>
      This is a pin!
      <img width={150} src={props.imageUrl} />

      {/* ensure delete button is only added when the user is logged in 
      and it is the user's pin */}
      {props.isLoggedIn && (Number(props.userId) === props.uploadedBy) &&
      <button onClick={props.deletePin}>Delete</button>}
      {/* TODO: Create like link/button */}
    </div>
  );
}

Pin.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  uploadedBy: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  deletePin: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
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
  }

  componentDidMount() {
    // load all pins from database
    this.loadAllPins();
  }
  showAddPinModal() {
    this.setState({ showAddPinModal: true });
  }
  closeAddPinModal() {
    this.setState({ showAddPinModal: false });    
  }
  loadAllPins() {
    api.getAllPins.call(this);
  }
  deletePin(pinId) {
    console.log(pinId);
    api.deletePin(pinId)
      .then((response) => {
        console.log(response);
        this.loadAllPins();
      });
  }

  render() {
    const { userId, isLoggedIn } = this.props;
    const pathname = this.props.location.pathname;
    let filteredPins;

    if (pathname === '/allpins') {
      filteredPins = this.state.allPins;
    } else if (pathname === '/mypins') {
      filteredPins = this.state.allPins.filter(pin => {
        console.log(pin.uploadedBy, userId);
        return pin.uploadedBy === Number(userId);
      });
    }
    return (
      <div className='pins-container'>
        <h3>{this.props.location.pathname}</h3>
        <AddPinBox
          showAddPinModal={this.showAddPinModal}
        />
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
            uploadedBy={pin.uploadedBy} />
        )}
      </div>
    );
  }
}

PinsContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

export default PinsContainer;