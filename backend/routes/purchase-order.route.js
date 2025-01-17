const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchase-order.controller');

router.get('/', purchaseOrderController.getPurchaseOrders);
router.get('/:id', purchaseOrderController.getPurchaseOrderById);
router.post('/', purchaseOrderController.createPurchaseOrder);
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);

module.exports = router;
