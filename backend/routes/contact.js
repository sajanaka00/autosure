const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // sender email
    pass: process.env.EMAIL_PASS  // app password
  }
});

// POST /api/contact - Handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Email content to send to company
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL, // company email to receive inquiries
      subject: `New Contact Form Inquiry - ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
          ${message}
        </div>
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        <p><small>Reply directly to: ${email}</small></p>
      `,
      replyTo: email // So you can reply directly to the customer
    };

    // Send email to company
    await transporter.sendMail(mailOptions);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle email sending errors
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return res.status(500).json({
        success: false,
        message: 'Email configuration error. Please contact support.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

module.exports = router;