const Contact = require('../models/Contact');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const galleryData = req.body;

    if (req.file) {
      galleryData.url = req.file.path;        // Cloudinary URL
      galleryData.thumbnail = req.file.path;  // Cloudinary URL
    } else {
      return res.status(400).json({
        message: 'File is required. Please upload an image or video.',
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

    if (req.file) {
      updateData.url = req.file.path;        // Cloudinary URL
      updateData.thumbnail = req.file.path;  // Cloudinary URL
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

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};