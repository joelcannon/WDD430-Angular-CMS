const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the UUID version 4 function

const messageSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: String, ref: 'Contact' },
});

// No need for a getter to convert _id from buffer to string, as _id is already a string

module.exports = mongoose.model('Message', messageSchema);
