const express = require('express');
const Contact = require('../models/Contact');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    if (req.body.vehicleId) {
      await contact.populate('vehicleId', 'make model year');
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      inquiry: contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contact inquiries (admin only)
router.get('/all', authenticateToken, authorizeRoles('admin', 'dealer'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, inquiryType } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (inquiryType) filter.inquiryType = inquiryType;

    const inquiries = await Contact.find(filter)
      .populate('vehicleId', 'make model year')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      inquiries,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get contact inquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch contact inquiries' });
  }
});

// Update contact inquiry status (admin only)
router.put('/:id/status', authenticateToken, authorizeRoles('admin', 'dealer'), async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('vehicleId', 'make model year');

    if (!inquiry) {
      return res.status(404).json({ error: 'Contact inquiry not found' });
    }

    res.json({
      message: 'Contact inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('Update contact inquiry error:', error);
    res.status(500).json({ error: 'Failed to update contact inquiry' });
  }
});

module.exports = router;