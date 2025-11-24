const express = require('express');
const {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  markAsRead,
  markAsUnread,
  deleteContactMessage,
  getContactMessageStats,
} = require('../controllers/contactMessageController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route - no authentication required
router.post('/', createContactMessage);

// Admin routes - authentication required
router.get('/', auth, getContactMessages);
router.get('/stats', auth, getContactMessageStats);
router.get('/:id', auth, getContactMessageById);
router.put('/:id', auth, updateContactMessage);
router.patch('/:id/mark-read', auth, markAsRead);
router.patch('/:id/mark-unread', auth, markAsUnread);
router.delete('/:id', auth, deleteContactMessage);

module.exports = router;