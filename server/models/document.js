// server/model/document.js

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the schema for a document's children as a subdocument
const childDocumentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: false },
    children: [{ type: mongoose.Schema.Types.Mixed }], // Allows for nested children
  },
  { _id: false }
); // Prevent Mongoose from creating a default ObjectId

// Define the schema for a document
const documentSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: false },
  children: [childDocumentSchema], // Use the childDocumentSchema for nested children
});

module.exports = mongoose.model('Document', documentSchema);
