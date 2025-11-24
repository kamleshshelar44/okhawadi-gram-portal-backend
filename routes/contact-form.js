const express = require('express');
const {
  getContactForms,
  getContactFormById,
  createContactForm,
  updateContactForm,
  deleteContactForm,
  getContactFormStats,
} = require('../controllers/contactFormController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route - no authentication required
router.post('/', createContactForm);

// Admin routes - authentication required
router.get('/', auth, getContactForms);
router.get('/stats', auth, getContactFormStats);
router.get('/:id', auth, getContactFormById);
router.put('/:id', auth, updateContactForm);
router.delete('/:id', auth, deleteContactForm);

module.exports = router;