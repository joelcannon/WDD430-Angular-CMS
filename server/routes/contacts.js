var express = require('express');
var router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// GET all contacts
router.get('/', (req, res) => {
  Contact.find()
    .populate('group')
    .then((contacts) => {
      res.status(200).json({
        message: 'Contacts fetched successfully!',
        contacts: contacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error.message,
      });
    });
});

// POST a new contact
router.post('/', (req, res, next) => {
  const contact = new Contact({
    _id: uuidv4(), // Generate a new UUID for the _id field
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

// PUT to update a contact by _id
router.put('/:_id', (req, res, next) => {
  Contact.findOne({ _id: req.params._id })
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found.',
        });
      }
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      contact
        .save()
        .then((result) => {
          res.status(200).json({
            message: 'Contact updated successfully',
            contact: result,
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
        message: 'Contact not found.',
        error: { contact: 'Contact not found' },
      });
    });
});

// DELETE a contact by _id
router.delete('/:_id', (req, res, next) => {
  Contact.findOne({ _id: req.params._id })
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found.',
        });
      }
      Contact.deleteOne({ _id: req.params._id })
        .then(() => {
          res.status(204).json({
            message: 'Contact deleted successfully',
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
        message: 'Contact not found.',
        error: { contact: 'Contact not found' },
      });
    });
});

module.exports = router;
