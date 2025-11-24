const express = require('express');
const {
  getAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
} = require('../controllers/awardController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getAwards);
router.get('/:id', getAwardById);
router.post('/', auth, upload.single('image'), createAward);
router.put('/:id', auth, upload.single('image'), updateAward);
router.delete('/:id', auth, deleteAward);

module.exports = router;