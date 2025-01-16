const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

/**
 * @swagger
 * tags:
 *   name: Donaciones
 *   description: Endpoints para la gestión de donaciones dentro de los proyectos
 */

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Obtener todas las donaciones
 *     tags: [Donaciones]
 *     responses:
 *       200:
 *         description: Lista de donaciones
 */
router.get('/', donationController.getDonations);

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     summary: Obtener una donación por ID
 *     tags: [Donaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donación encontrada
 *       404:
 *         description: Donación no encontrada
 */
router.get('/:id', donationController.getDonationById);

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Crear una nueva donación
 *     tags: [Donaciones]
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
 *               donor:
 *                 type: string
 *               amount:
 *                 type: number
 *               budget_item_id:
 *                 type: integer
 *               project_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Donación creada exitosamente
 */
router.post('/', donationController.createDonation);

/**
 * @swagger
 * /api/donations/{id}:
 *   delete:
 *     summary: Eliminar una donación por ID
 *     tags: [Donaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donación eliminada exitosamente
 *       404:
 *         description: Donación no encontrada
 */
router.delete('/:id', donationController.deleteDonation);

module.exports = router;
