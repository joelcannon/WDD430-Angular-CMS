const express = require('express');
const router = express.Router();
const { handleError } = require('../middlewares/utils');

const Contact = require('../models/contact'); // Import the Contact model
const { v4: uuidv4 } = require('uuid'); // Ensure uuidv4 is imported to generate IDs

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().populate('group');
    res.status(200).json({
      message: 'Contacts fetched successfully!',
      data: contacts,
    });
  } catch (error) {
    handleError(res, 'fetching the contacts', error);
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact({
      _id: uuidv4(), // Generate a new UUID for the _id field
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group,
    });
    const createdContact = await contact.save();
    res.status(201).json({
      message: 'Contact added successfully',
      data: createdContact,
    });
  } catch (error) {
    handleError(res, 'adding the contact', error);
  }
});

// PUT to update a contact by _id
router.put('/:_id', async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({
        message: 'Contact not found.',
      });
    }
    res.status(200).json({
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    handleError(res, 'updating the contact', error);
  }
});

// DELETE a contact by _id
router.delete('/:_id', async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found.',
      });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    handleError(res, 'deleting the contact', error);
  }
});

module.exports = router;
