const BudgetItem = require('../models/budget-item.model');

exports.getBudgetItems = async (req, res) => {
  try {
    const items = await BudgetItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget items', error });
  }
};

exports.getBudgetItemById = async (req, res) => {
  try {
    const item = await BudgetItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Budget item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget item', error });
  }
};

exports.createBudgetItem = async (req, res) => {
  try {
    const { name, project_id } = req.body;
    const item = await BudgetItem.create({ name, project_id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget item', error });
  }
};

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
