const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PinSchema = new mongoose.Schema({
  imageUrl: String,
  uploadedBy: Number
});

const Pin = mongoose.model('pinterest_pin', PinSchema);

module.exports = Pin;
