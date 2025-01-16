const express = require('express');
const router = express.Router();
const budgetItemController = require('../controllers/budget-item.controller');

/**
 * @swagger
 * tags:
 *   name: Rubros
 *   description: Endpoints para la gestión de rubros dentro de los proyectos
 */

/**
 * @swagger
 * /api/budget-items:
 *   get:
 *     summary: Obtener todos los rubros
 *     tags: [Rubros]
 *     responses:
 *       200:
 *         description: Lista de rubros
 */
router.get('/', budgetItemController.getBudgetItems);

/**
 * @swagger
 * /api/budget-items/{id}:
 *   get:
 *     summary: Obtener un rubro por ID
 *     tags: [Rubros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rubro encontrado
 *       404:
 *         description: Rubro no encontrado
 */
router.get('/:id', budgetItemController.getBudgetItemById);

/**
 * @swagger
 * /api/budget-items:
 *   post:
 *     summary: Crear un nuevo rubro
 *     tags: [Rubros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               project_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Rubro creado exitosamente
 */
router.post('/', budgetItemController.createBudgetItem);

/**
 * @swagger
 * /api/budget-items/{id}:
 *   delete:
 *     summary: Eliminar un rubro por ID
 *     tags: [Rubros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rubro eliminado exitosamente
 *       404:
 *         description: Rubro no encontrado
 */
router.delete('/:id', budgetItemController.deleteBudgetItem);

module.exports = router;
