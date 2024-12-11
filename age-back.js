// Install the necessary dependencies first:
// npm install express body-parser nodemailer cors dotenv

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
  port: 587, // or 465 for secure
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Endpoint to handle form submission
app.post('/submit-agent-form', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: 'ramandhandumbuya01@gmail.com, infokangaylux@gmail.com', // Recipients
    subject: 'New MELBET Agent Form Submission',
    text: `You have received a new form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit the form. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/* .env file content (create a .env file in the same directory):
SMTP_HOST=smtp.your-email-provider.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password-or-app-password
*/
