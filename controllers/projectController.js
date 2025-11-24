const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, lang = 'en' } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    // Localize the response based on language
    const localizedProjects = projects.map(project => ({
      _id: project._id,
      title: project[`title_${lang}`] || project.title,
      description: project[`description_${lang}`] || project.description,
      category: project.category,
      status: project.status,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
      image: project.image,
      progress: project.progress,
      isActive: project.isActive,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }));

    res.status(200).json({
      success: true,
      data: localizedProjects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Localize the response based on language
    const localizedProject = {
      _id: project._id,
      title: project[`title_${lang}`] || project.title,
      description: project[`description_${lang}`] || project.description,
      category: project.category,
      status: project.status,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
      image: project.image,
      progress: project.progress,
      isActive: project.isActive,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};