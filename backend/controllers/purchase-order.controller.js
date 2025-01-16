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
    const orders = await PurchaseOrder.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving purchase orders', error });
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
