const express = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', auth, upload.single('image'), createNews);
router.put('/:id', auth, upload.single('image'), updateNews);
router.delete('/:id', auth, deleteNews);

module.exports = router;