const Project = require('../models/project.model');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, municipality, department, start_date, end_date } = req.body;
    const project = await Project.create({ name, municipality, department, start_date, end_date });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
