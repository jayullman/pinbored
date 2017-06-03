import axios from 'axios';

export default {
  submitPin: imageUrl => 
    axios.post('/api/submitpin', {
      imageUrl
    }),
  checkIfLoggedIn: () => 
    axios('/api/isuserauthenticated')
      .then(({ data }) => {
        if (data.authStatus === true) {
          return true;
        }
        return false;
      }),
  logout() {
    return axios.post('/api/logout')
      .then(({ data }) => {
        if (!data.error) {
          // return true value if log out was successful
          return true;
        }
        return false;
      });
  },
  getAllPins() {
    axios('/api/allpins')
      .then(({ data }) => {
        this.setState({ allPins: data.allPins });
      });
  },
  deletePin(pinId) {
    return axios.delete(`/api/deletepin/${pinId}`)
      .then(response => response.data);
  },
  getUsersTwitterId() {
    axios('/api/getmyid')
      .then(({ data }) => {
        this.setState({ twitterId: data.twitterId });
      });
  },
  likePin(pinId, userId) {
    return axios.put(`/api/likepin/${pinId}/${userId}`);
  }
};