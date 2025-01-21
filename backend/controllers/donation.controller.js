const { Op } = require('sequelize');
const Donation = require('../models/donation.model');

/**
 * Obtiene todas las donaciones registradas.
 * @async
 * @function getDonations
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una lista de donaciones en formato JSON.
 */
exports.getDonations = async (req, res) => {
  try {
    const { page = 1, size = 10, search = '' } = req.query; // Parámetros de paginación y búsqueda
    const project_id = req.params.id; // Extraer project_id de la URL
    const budget_item_id = req.params.budget_item_id; // Extraer budget_item_id de la URL

    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Construcción del filtro dinámico
    const whereClause = {
      ...(search ? { donor: { [Op.iLike]: `%${search}%` } } : {}), // Búsqueda insensible a mayúsculas/minúsculas en el campo `donor`
      ...(project_id ? { project_id: parseInt(project_id, 10) } : {}), // Filtrar por `project_id`
      ...(budget_item_id ? { budget_item_id: parseInt(budget_item_id, 10) } : {}) // Filtrar por `budget_item_id`
    };

    const { count, rows } = await Donation.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      donations: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las donaciones', error });
  }
};

/**
 * Obtiene una donación específica por su ID.
 * @async
 * @function getDonationById
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve la donación encontrada o un mensaje de error si no existe.
 */
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donation', error });
  }
};

/**
 * Crea una nueva donación dentro de un proyecto y asignada a un rubro.
 * @async
 * @function createDonation
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos de la donación en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve la donación creada en formato JSON.
 */
exports.createDonation = async (req, res) => {
  try {
    const { date, donor, amount, budget_item_id, project_id } = req.body;
    const donation = await Donation.create({ date, donor, amount, budget_item_id, project_id });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error });
  }
};

/**
 * Elimina una donación por su ID.
 * @async
 * @function deleteDonation
 * @param {import('express').Request} req - Objeto de solicitud de Express con el ID de la donación en los parámetros.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve un mensaje de éxito si la donación fue eliminada o un mensaje de error si no se encuentra.
 */
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    await donation.destroy();
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error });
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
exports.updateDonation = async (req, res) => {
  try {
    const item = await Donation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Donation not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget item', error });
  }
};