const express = require('express');
const {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
} = require('../controllers/schemeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getSchemes);
router.get('/:id', getSchemeById);
router.post('/', auth, upload.single('image'), createScheme);
router.put('/:id', auth, upload.single('image'), updateScheme);
router.delete('/:id', auth, deleteScheme);

module.exports = router;