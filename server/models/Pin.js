const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PinSchema = new mongoose.Schema({
  imageUrl: String,
  uploadedBy: Number,
  twitterUserName: String,
  userProfileImgUrl: String,
  // likes will hold an array of user ids off all users that liked the pin
  likes: [Number]
});

const Pin = mongoose.model('pinterest_pin', PinSchema);

module.exports = Pin;
