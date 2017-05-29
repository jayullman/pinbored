import axios from 'axios';

export default {
  submitPin: (imageUrl) => {
    return axios.post('/submitpin', {
      imageUrl
    });
  },
  checkIfLoggedIn: () => {
    return axios('/isuserauthenticated')
      .then(({ data }) => {
        if (data.authStatus === true) {
          return true;
        }
        return false;
      });
  },
  getAllPins: () => {
    return axios('/allpins')
      .then(({ data }) => {
        return data.allPins
      });
  }
}