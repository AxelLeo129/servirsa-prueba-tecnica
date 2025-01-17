const PurchaseOrder = require('../models/purchase-order.model');

exports.getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving purchase orders', error });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Purchase order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving purchase order', error });
  }
};

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { date, supplier, amount, budget_item_id, project_id } = req.body;
    const order = await PurchaseOrder.create({ date, supplier, amount, budget_item_id, project_id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase order', error });
  }
};

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
