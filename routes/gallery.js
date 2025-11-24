const express = require('express');
const {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getGallery);
router.get('/:id', getGalleryById);
router.post('/', upload.single('file'), createGalleryItem);
router.put('/:id', auth, upload.single('file'), updateGalleryItem);
router.delete('/:id', auth, deleteGalleryItem);

module.exports = router;