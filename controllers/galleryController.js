const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, type, lang = 'en' } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }

    const gallery = await Gallery.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Gallery.countDocuments(query);

    // Localize the response based on language
    const localizedGallery = gallery.map(item => ({
      _id: item._id,
      title: item[`title_${lang}`] || item.title,
      description: item[`description_${lang}`] || item.description,
      type: item.type,
      url: item.url,
      thumbnail: item.thumbnail,
      category: item.category,
      date: item.date,
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json({
      success: true,
      data: localizedGallery,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGalleryById = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Localize the response based on language
    const localizedGallery = {
      _id: gallery._id,
      title: gallery[`title_${lang}`] || gallery.title,
      description: gallery[`description_${lang}`] || gallery.description,
      type: gallery.type,
      url: gallery.url,
      thumbnail: gallery.thumbnail,
      category: gallery.category,
      date: gallery.date,
      isActive: gallery.isActive,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedGallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const galleryData = req.body;
  const baseUrl =`${req.protocol}://${req.get('host')}`;
    if (req.file) {
      galleryData.url = `${baseUrl}/uploads/${req.file.filename}`;
      galleryData.thumbnail = `${baseUrl}/uploads/${req.file.filename}`;
      console.log('✅ File uploaded, URL set to:', galleryData.url);
    } else {
      console.log('❌ No file received in req.file');
      // If no file uploaded, return error since URL is required
      return res.status(400).json({
        message: 'File is required. Please upload an image or video.',
        debug: {
          hasFile: !!req.file,
          bodyKeys: Object.keys(req.body),
          contentType: req.get('Content-Type')
        }
      });
    }

    const gallery = await Gallery.create(galleryData);

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const updateData = req.body;
const baseUrl = `${req.protocol}://${req.get('host')}`;
    if (req.file) {
      updateData.url = `${baseUrl}/uploads/${req.file.filename}`;
      updateData.thumbnail = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};