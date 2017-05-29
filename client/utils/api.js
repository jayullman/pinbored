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
  getAllPins() {
    axios('/allpins')
      .then(({ data }) => {
        this.setState({ allPins: data.allPins });
      });
  },
  deletePin(pinId) {
    return axios.delete(`/deletepin/${pinId}`)
      .then((response) => {
        return response.data;
      });
  },
  getUsersTwitterId() {
    axios('/getmyid')
      .then(({ data }) => {
        console.log(data.twitterId);
        this.setState({ twitterId: data.twitterId });
      });
  }
}