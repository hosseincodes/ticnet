const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: {type: String},
  sender: {type: String},
  receiver: {type: String},
  time: {
    type: String,
  },
  isRead: {type: Boolean, default: false},
  edited: {type: Boolean, default: false},
  type: {type: String, default: "msg"}
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);