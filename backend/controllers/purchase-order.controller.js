const { Op } = require('sequelize');
const PurchaseOrder = require('../models/purchase-order.model');

/**
 * Obtiene todas las órdenes de compra registradas.
 * @async
 * @function getPurchaseOrders
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una lista de órdenes de compra en formato JSON.
 */
exports.getPurchaseOrders = async (req, res) => {
  try {
    const { page = 1, size = 10, search = '' } = req.query; // Parámetros de paginación y búsqueda
    const project_id = req.params.id; // Extraer project_id de la URL
    const budget_item_id = req.params.budget_item_id; // Extraer budget_item_id de la URL

    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Construcción del filtro dinámico
    const whereClause = {
      ...(search ? { supplier: { [Op.iLike]: `%${search}%` } } : {}), // Búsqueda insensible a mayúsculas/minúsculas en `supplier`
      ...(project_id ? { project_id: parseInt(project_id, 10) } : {}), // Filtrar por `project_id`
      ...(budget_item_id ? { budget_item_id: parseInt(budget_item_id, 10) } : {}) // Filtrar por `budget_item_id`
    };

    const { count, rows } = await PurchaseOrder.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      purchaseOrders: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las órdenes de compra', error });
  }
};

/**
 * Obtiene una orden de compra específica por su ID.
 * @async
 * @function getPurchaseOrderById
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve la orden de compra encontrada o un mensaje de error si no existe.
 */
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Purchase order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving purchase order', error });
  }
};

/**
 * Crea una nueva orden de compra dentro de un proyecto y asignada a un rubro.
 * @async
 * @function createPurchaseOrder
 * @param {import('express').Request} req - Objeto de solicitud de Express con los datos de la orden de compra en el cuerpo.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve la orden de compra creada en formato JSON.
 */
exports.createPurchaseOrder = async (req, res) => {
  try {
    const { date, supplier, amount, budget_item_id, project_id } = req.body;
    const order = await PurchaseOrder.create({ date, supplier, amount, budget_item_id, project_id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase order', error });
  }
};

/**
 * Elimina una orden de compra por su ID.
 * @async
 * @function deletePurchaseOrder
 * @param {import('express').Request} req - Objeto de solicitud de Express con el ID de la orden de compra en los parámetros.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve un mensaje de éxito si la orden de compra fue eliminada o un mensaje de error si no se encuentra.
 */
exports.deletePurchaseOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Purchase order not found' });

    await order.destroy();
    res.json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting purchase order', error });
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
exports.updatePurchaseOrder = async (req, res) => {
  try {
    const item = await PurchaseOrder.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Purchase order not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating purchase order', error });
  }
};
