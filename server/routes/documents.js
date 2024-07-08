const express = require('express');
const router = express.Router();
const { handleError } = require('../middlewares/utils');

const Document = require('../models/document');
const { v4: uuidv4 } = require('uuid'); // Ensure uuidv4 is imported to generate IDs

// GET all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find({});
    res.status(200).json({
      message: 'Documents fetched successfully!',
      data: documents,
    });
  } catch (error) {
    handleError(res, 'fetching the document', error);
  }
});

// POST a new document
router.post('/', async (req, res) => {
  try {
    const document = new Document({
      _id: uuidv4(), // Generate a new UUID for the _id field
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });
    const createdDocument = await document.save();
    res.status(201).json({
      message: 'Document added successfully',
      document: createdDocument,
    });
  } catch (error) {
    handleError(res, 'adding the document', error);
  }
});

// PUT to update a document by _id
router.put('/:_id', async (req, res) => {
  try {
    const updatedDocument = await Document.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({
        message: 'Document not found.',
      });
    }
    res.status(200).json({
      message: 'Document updated successfully',
      data: updatedDocument,
    });
  } catch (error) {
    handleError(res, 'updating the document', error);
  }
});

// DELETE a document by _id
router.delete('/:_id', async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params._id });
    if (!document) {
      return res.status(404).json({
        message: 'Document not found.',
      });
    }
    await Document.deleteOne({ _id: req.params._id });
    res.status(204).send(); // No content to send back
  } catch (error) {
    handleError(res, 'deleting the document', error);
  }
});

module.exports = router;
