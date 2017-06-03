const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String,
    profileImageUrl: String
  }
});

const User = mongoose.model('pinterest_user', UserSchema);

module.exports = User;
