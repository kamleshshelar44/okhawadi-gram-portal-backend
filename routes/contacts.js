const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', auth, upload.single('image'), createContact);
router.put('/:id', auth, upload.single('image'), updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;