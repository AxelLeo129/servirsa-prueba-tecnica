const Project = require('../models/project.model');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error });
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
