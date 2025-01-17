const { Op } = require('sequelize');
const BudgetItem = require('../models/budget-item.model');

/**
 * Obtiene todos los rubros registrados.
 * @async
 * @function getBudgetItems
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una lista de rubros en formato JSON.
 */
exports.getBudgetItems = async (req, res) => {
  try {
    const { page = 1, size = 10, search = '' } = req.query; // Parámetros de paginación y búsqueda
    const project_id = req.params.id; // Extraer project_id de la URL

    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Construcción del filtro dinámico
    const whereClause = {
      ...(search ? { name: { [Op.iLike]: `%${search}%` } } : {}), // Búsqueda insensible a mayúsculas/minúsculas
      ...(project_id ? { project_id: parseInt(project_id, 10) } : {}) // Filtrar por project_id de la URL
    };

    const { count, rows } = await BudgetItem.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      budgetItems: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los ítems de presupuesto', error });
  }
};

/**
 * Obtiene un rubro específico por su ID.
 * @async
 * @function getBudgetItemById
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el rubro encontrado o un mensaje de error si no existe.
 */
exports.getBudgetItemById = async (req, res) => {
  try {
    const item = await BudgetItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Budget item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget item', error });
  }
};

/**
 * Crea un nuevo rubro dentro de un proyecto.
 * @async
 * @function createBudgetItem
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos del rubro en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el rubro creado en formato JSON.
 */
exports.createBudgetItem = async (req, res) => {
  try {
    const { name, project_id } = req.body;
    const item = await BudgetItem.create({ name, project_id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget item', error });
  }
};

/**
 * Actualiza un rubro existente por su ID.
 * @async
 * @function updateBudgetItem
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos a actualizar en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve el rubro actualizado en formato JSON o un mensaje de error si no se encuentra.
 */
exports.updateBudgetItem = async (req, res) => {
  try {
    const item = await BudgetItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Budget item not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget item', error });
  }
};

/**
 * Elimina un rubro por su ID.
 * @async
 * @function deleteBudgetItem
 * @param {import('express').Request} req - Objeto de solicitud de Express con el ID del rubro en los parámetros.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve un mensaje de éxito si el rubro fue eliminado o un mensaje de error si no se encuentra.
 */
exports.deleteBudgetItem = async (req, res) => {
  try {
    const item = await BudgetItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Budget item not found' });

    await item.destroy();
    res.json({ message: 'Budget item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget item', error });
  }
};
