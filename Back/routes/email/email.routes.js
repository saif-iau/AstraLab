const express = require('express');
const { body } = require('express-validator');
const { sendEmail } = require('../../controllers/email/email.controller');

const emailRouter = express.Router();

// Define the route for sending emails with validation
emailRouter.post(
  '/contact',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('subject').notEmpty().withMessage('subject is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  sendEmail
);

module.exports = emailRouter;