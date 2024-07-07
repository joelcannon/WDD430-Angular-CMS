// server/model/contact.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  imageUrl: { type: String, default: null },
  group: [{ type: String, ref: 'Contact', default: uuidv4 }],
});

module.exports = mongoose.model('Contact', contactSchema);
