import React from 'react';
import PropTypes from 'prop-types';

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
  render() {
    return (
      <div className='modal-addPin'>
        <form>
          <input placeholder='Image URL' />
          <button onClick={this.props.submitPin}>Submit</button>
        </form>
      </div>
    );
  }
}

Modal_AddPin.propTypes = {
  submitPin: PropTypes.func.isRequired
};

class PinsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddPinModal: false
    };

    this.showAddPinModal = this.showAddPinModal.bind(this);
    this.submitPin = this.submitPin.bind(this);
  }
  
  showAddPinModal() {
    this.setState({ showAddPinModal: true });
  }

  submitPin(url) {
    api.submitPin(url);
  }

  render() {
    return (
      <div className='pins-container'>
        <AddPinBox
          showAddPinModal={this.showAddPinModal}
        />
      </div>
    );
  }
}

export default PinsContainer;