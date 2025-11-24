const ContactMessage = require('../models/ContactMessage');

// Public: Create a new contact message
const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'All fields (name, email, message) are required'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
      });
    }

    // Trim and validate field lengths
    if (name.trim().length > 100) {
      return res.status(400).json({
        message: 'Name cannot exceed 100 characters'
      });
    }

    if (message.trim().length > 2000) {
      return res.status(400).json({
        message: 'Message cannot exceed 2000 characters'
      });
    }

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: contactMessage,
    });
  } catch (error) {
    console.error('Contact message error:', error);

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

// Admin: Get all contact messages with pagination and filters
const getContactMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      isRead,
      search
    } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by read status
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const contactMessages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactMessage.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contactMessages,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get contact message by ID
const getContactMessageById = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findById(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      data: contactMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update contact message (mark as read, update status, add reply)
const updateContactMessage = async (req, res) => {
  try {
    const { status, isRead, adminReply } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (isRead !== undefined) updateData.isRead = isRead;
    if (adminReply !== undefined) updateData.adminReply = adminReply;

    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message updated successfully',
      data: contactMessage,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: Mark message as read
const markAsRead = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: contactMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Mark message as unread
const markAsUnread = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: false },
      { new: true }
    );

    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as unread',
      data: contactMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete contact message
const deleteContactMessage = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get statistics for admin dashboard
const getContactMessageStats = async (req, res) => {
  try {
    const stats = await ContactMessage.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
          closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
          unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { total: 0, pending: 0, replied: 0, closed: 0, unread: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  markAsRead,
  markAsUnread,
  deleteContactMessage,
  getContactMessageStats,
};