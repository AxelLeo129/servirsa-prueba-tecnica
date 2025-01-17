const express = require('express');
const router = express.Router();
const budgetItemController = require('../controllers/budget-item.controller');

router.get('/', budgetItemController.getBudgetItems);
router.get('/:id', budgetItemController.getBudgetItemById);
router.post('/', budgetItemController.createBudgetItem);
router.put('/:id', budgetItemController.updateBudgetItem);
router.delete('/:id', budgetItemController.deleteBudgetItem);

module.exports = router;
