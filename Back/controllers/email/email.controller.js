const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'saifalshiban@gmail.com', // Your email address
    pass: 'ypid nhkc xgcl mbvb' // Your email password or app-specific password
  }
});

// Function to send an email
const sendEmail = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body; // Expecting these fields from the frontend

  const mailOptions = {
    from: email, // User's email address (for reference)
    to: 'saifalshiban@gmail.com', // Your email address (always the recipient)
    subject: `Contact Me Form Submission from ${name}`, // Subject line
    text: `
      You have a new message from your website's contact form:

      Name: ${name}
      Email: ${email}
      Message: ${message}
    ` // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Your message has been sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending your message.');
  }
};

module.exports = {
  sendEmail
};