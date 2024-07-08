const express = require('express');
const router = express.Router();
const { handleError } = require('../middlewares/utils');

const Message = require('../models/message'); // Import the Message model

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender');
    res.status(200).json({
      message: 'Messages fetched successfully!',
      data: messages,
    });
  } catch (error) {
    handleError(res, 'fetching the messages', error);
  }
});

// POST a new message
router.post('/', async (req, res) => {
  const message = new Message({
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  try {
    const createdMessage = await message.save();
    res.status(201).json({
      message: 'Message added successfully',
      data: createdMessage,
    });
  } catch (error) {
    handleError(res, 'adding the messages', error);
  }
});

// PUT to update a message by _id
router.put('/:_id', async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({
        message: 'Message not found.',
      });
    }
    res.status(200).json({
      message: 'Message updated successfully',
      data: updatedMessage,
    });
  } catch (error) {
    handleError(res, 'updating the message', error);
  }
});

// DELETE a message by _id
router.delete('/:_id', async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params._id });
    if (!message) {
      return res.status(404).json({
        message: 'Message not found.',
      });
    }
    await Message.deleteOne({ _id: req.params._id });
    res.status(204).send(); // No content to send back
  } catch (error) {
    handleError(res, 'deleting the messages', error);
  }
});

module.exports = router;
