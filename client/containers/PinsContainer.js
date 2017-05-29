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
      });
    this.clearUrlField();
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
  closeAddPinModal: PropTypes.func.isRequired
};

const Pin = (props) => {
  return (
    <div className='pin'>
      This is a pin!
      <img width={150} src={props.imageUrl} />
    </div>
  );
}

Pin.propTypes = {
  imageUrl: PropTypes.string.isRequired
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
  }

  componentDidMount() {
    // load all pins from database
    api.getAllPins()
      .then((allPins) => {
        console.log(allPins);
        this.setState({ allPins });
      });
  }
  
  showAddPinModal() {
    this.setState({ showAddPinModal: true });
  }
  closeAddPinModal() {
    this.setState({ showAddPinModal: false });    
  }

  render() {
    return (
      <div className='pins-container'>
        <AddPinBox
          showAddPinModal={this.showAddPinModal}
        />
        {this.state.showAddPinModal && 
          <Modal_AddPin closeAddPinModal={this.closeAddPinModal} />}
      
        {this.state.allPins.map((pin, index) => 
          <Pin 
            key={pin.imageUrl + index} 
            imageUrl={pin.imageUrl}/>
        )}
      </div>
    );
  }
}

export default PinsContainer;