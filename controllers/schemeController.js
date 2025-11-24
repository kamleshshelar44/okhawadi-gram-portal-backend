const Scheme = require('../models/Scheme');

const getSchemes = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, lang = 'en' } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const schemes = await Scheme.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Scheme.countDocuments(query);

    // Localize the response based on language
    const localizedSchemes = schemes.map(scheme => ({
      _id: scheme._id,
      title: scheme[`title_${lang}`] || scheme.title,
      description: scheme[`description_${lang}`] || scheme.description,
      category: scheme.category,
      eligibility: scheme[`eligibility_${lang}`] || scheme.eligibility,
      benefits: scheme[`benefits_${lang}`] || scheme.benefits,
      image: scheme.image,
      documents: scheme.documents,
      applicationLink: scheme.applicationLink,
      lastDate: scheme.lastDate,
      contactPerson: scheme.contactPerson,
      contactPhone: scheme.contactPhone,
      isActive: scheme.isActive,
      createdAt: scheme.createdAt,
      updatedAt: scheme.updatedAt
    }));

    res.status(200).json({
      success: true,
      data: localizedSchemes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSchemeById = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    // Localize the response based on language
    const localizedScheme = {
      _id: scheme._id,
      title: scheme[`title_${lang}`] || scheme.title,
      description: scheme[`description_${lang}`] || scheme.description,
      category: scheme.category,
      eligibility: scheme[`eligibility_${lang}`] || scheme.eligibility,
      benefits: scheme[`benefits_${lang}`] || scheme.benefits,
      image: scheme.image,
      documents: scheme.documents,
      applicationLink: scheme.applicationLink,
      lastDate: scheme.lastDate,
      contactPerson: scheme.contactPerson,
      contactPhone: scheme.contactPhone,
      isActive: scheme.isActive,
      createdAt: scheme.createdAt,
      updatedAt: scheme.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedScheme,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createScheme = async (req, res) => {
  try {
    const schemeData = req.body;

    if (req.file) {
      schemeData.image = `/uploads/${req.file.filename}`;
    }

    const scheme = await Scheme.create(schemeData);

    res.status(201).json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateScheme = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Scheme deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
};