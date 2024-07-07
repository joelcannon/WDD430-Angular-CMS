var express = require('express');
var router = express.Router();
const Document = require('../models/document');

// GET all documents
router.get('/', (req, res) => {
  Document.find({})
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res, next) => {
  const document = new Document({
    _id: uuidv4(), // Generate a new UUID for the _id field
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.put('/:_id', (req, res, next) => {
  Document.findOne({ _id: req.params._id })
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found.',
        });
      }
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      document
        .save()
        .then((result) => {
          res.status(200).json({
            message: 'Document updated successfully',
            document: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error occurred',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found' },
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Document.findOne({ _id: req.params._id })
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found.',
        });
      }
      Document.deleteOne({ _id: req.params._id })
        .then(() => {
          res.status(204).json({
            message: 'Document deleted successfully',
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error occurred',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found' },
      });
    });
});

module.exports = router;
