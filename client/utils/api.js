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
    return axios('/api/allpins')
      .then(({ data }) => {
        this.setState({ allPins: data.allPins });
      });
  },
  deletePin(pinId) {
    return axios.delete(`/api/deletepin/${pinId}`)
      .then(response => response.data);
  },
  getUsersTwitterInfo() {
    axios('/api/getmyinfo')
      .then(({ data }) => {
        this.setState({ 
          twitterId: data.twitterId,
          twitterUsername: data.twitterUsername
        });
      });
  },
  likePin(pinId, userId) {
    return axios.put(`/api/likepin/${pinId}/${userId}`);
  }
};