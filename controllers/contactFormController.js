const ContactForm = require('../models/ContactForm');

const getContactForms = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, isRead } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const contactForms = await ContactForm.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactForm.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contactForms,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactFormById = async (req, res) => {
  try {
    const contactForm = await ContactForm.findById(req.params.id);

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form submission not found' });
    }

    res.status(200).json({
      success: true,
      data: contactForm,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContactForm = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        message: 'All fields (name, email, mobile, message) are required'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
      });
    }

    // Validate mobile format (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        message: 'Please enter a valid 10-digit mobile number'
      });
    }

    const contactForm = await ContactForm.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: contactForm,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      message: 'Failed to submit your message. Please try again later.'
    });
  }
};

const updateContactForm = async (req, res) => {
  try {
    const { status, isRead, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (isRead !== undefined) updateData.isRead = isRead;
    if (notes !== undefined) updateData.notes = notes;

    const contactForm = await ContactForm.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form submission not found' });
    }

    res.status(200).json({
      success: true,
      data: contactForm,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContactForm = async (req, res) => {
  try {
    const contactForm = await ContactForm.findByIdAndDelete(req.params.id);

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form submission not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submission deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics for admin dashboard
const getContactFormStats = async (req, res) => {
  try {
    const stats = await ContactForm.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          reviewed: { $sum: { $cond: [{ $eq: ['$status', 'reviewed'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { total: 0, pending: 0, reviewed: 0, resolved: 0, unread: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactForms,
  getContactFormById,
  createContactForm,
  updateContactForm,
  deleteContactForm,
  getContactFormStats,
};