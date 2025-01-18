const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchase-order.controller');

/**
 * @swagger
 * tags:
 *   name: Órdenes de Compra
 *   description: Endpoints para la gestión de órdenes de compra dentro de los proyectos
 */

/**
 * @swagger
 * /api/purchase-orders:
 *   get:
 *     summary: Obtener todas las órdenes de compra
 *     tags: [Órdenes de Compra]
 *     responses:
 *       200:
 *         description: Lista de órdenes de compra
 */
router.get('/list/:id/:budget_item_id', purchaseOrderController.getPurchaseOrders);

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   get:
 *     summary: Obtener una orden de compra por ID
 *     tags: [Órdenes de Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden de compra encontrada
 *       404:
 *         description: Orden de compra no encontrada
 */
router.get('/:id', purchaseOrderController.getPurchaseOrderById);

/**
 * @swagger
 * /api/purchase-orders:
 *   post:
 *     summary: Crear una nueva orden de compra
 *     tags: [Órdenes de Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               supplier:
 *                 type: string
 *               amount:
 *                 type: number
 *               budget_item_id:
 *                 type: integer
 *               project_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Orden de compra creada exitosamente
 */
router.post('/', purchaseOrderController.createPurchaseOrder);

router.put('/:id', purchaseOrderController.updatePurchaseOrder);

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   delete:
 *     summary: Eliminar una orden de compra por ID
 *     tags: [Órdenes de Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden de compra eliminada exitosamente
 *       404:
 *         description: Orden de compra no encontrada
 */
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);

module.exports = router;
