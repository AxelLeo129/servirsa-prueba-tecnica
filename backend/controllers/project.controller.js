const { Op } = require('sequelize');
const Project = require('../models/project.model');

/**
 * Obtiene todos los proyectos registrados.
 * @async
 * @function getProjects
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una lista de proyectos en formato JSON.
 */
exports.getProjects = async (req, res) => {
  try {
    const { page = 1, size = 10, search = '' } = req.query; // Parámetros de paginación y búsqueda
    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const whereClause = search
      ? {
          name: { [Op.iLike]: `%${search}%` }, // Búsqueda insensible a mayúsculas/minúsculas
        }
      : {};

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      projects: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error });
  }
};

/**
 * Obtiene un proyecto específico por su ID.
 * @async
 * @function getProjectById
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el proyecto encontrado o un mensaje de error si no existe.
 */
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

/**
 * Crea un nuevo proyecto.
 * @async
 * @function createProject
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos del proyecto en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el proyecto creado en formato JSON.
 */
exports.createProject = async (req, res) => {
  try {
    const { name, municipality, department, start_date, end_date } = req.body;
    const project = await Project.create({ name, municipality, department, start_date, end_date });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

/**
 * Actualiza un proyecto existente por su ID.
 * @async
 * @function updateProject
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos a actualizar en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el proyecto actualizado en formato JSON o un mensaje de error si no se encuentra.
 */
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

/**
 * Elimina un proyecto por su ID.
 * @async
 * @function deleteProject
 * @param {import('express').Request} req - Objeto de solicitud de Express con el ID del proyecto en los parámetros.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve un mensaje de éxito si el proyecto fue eliminado o un mensaje de error si no se encuentra.
 */
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
