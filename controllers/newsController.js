const News = require('../models/News');

const getNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, lang = 'en' } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const news = await News.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await News.countDocuments(query);

    // Localize the response based on language
    const localizedNews = news.map(item => ({
      _id: item._id,
      title: item[`title_${lang}`] || item.title,
      content: item[`content_${lang}`] || item.content,
      summary: item[`summary_${lang}`] || item.summary,
      category: item.category,
      image: item.image,
      date: item.date,
      author: item.author,
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json({
      success: true,
      data: localizedNews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Localize the response based on language
    const localizedNews = {
      _id: news._id,
      title: news[`title_${lang}`] || news.title,
      content: news[`content_${lang}`] || news.content,
      summary: news[`summary_${lang}`] || news.summary,
      category: news.category,
      image: news.image,
      date: news.date,
      author: news.author,
      isActive: news.isActive,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedNews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const newsData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    if (req.file) {
      newsData.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const news = await News.create(newsData);

    res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const updateData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    if (req.file) {
      updateData.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const news = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.status(200).json({
      success: true,
      message: 'News deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};