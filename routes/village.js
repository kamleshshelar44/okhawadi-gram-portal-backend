const express = require('express');
const {
  getVillageInfo,
  updateVillageInfo,
  getVillageInfoForAdmin,
  deleteVillageInfo,
  uploadSliderImage,
  deleteSliderImage,
  updateSliderImageCaption
} = require('../controllers/villageController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const router = express.Router();

// Public endpoint - gets localized village information
router.get('/', getVillageInfo);

// Admin endpoints - require authentication
router.get('/admin',auth, getVillageInfoForAdmin);
router.put('/', auth, updateVillageInfo);
router.delete('/', auth, deleteVillageInfo);

// Test endpoint (no auth) - for debugging
router.put('/test', updateVillageInfo);

// Slider image management endpoints - require authentication
router.post('/slider/upload', auth, multer.single('image'), uploadSliderImage);
router.delete('/slider/:imageId', auth, deleteSliderImage);
router.put('/slider/:imageId/caption', auth, updateSliderImageCaption);

module.exports = router;