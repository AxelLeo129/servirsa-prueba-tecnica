const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project.model');
const BudgetItem = require('./budget-item.model');

/**
 * Modelo de Órdenes de Compra (PurchaseOrder).
 * Representa las órdenes de compra realizadas dentro de un proyecto y asignadas a un rubro específico.
 * 
 * @typedef {Object} PurchaseOrder
 * @property {number} id - Identificador único de la orden de compra.
 * @property {Date} date - Fecha en la que se realizó la orden de compra.
 * @property {string} supplier - Nombre del proveedor.
 * @property {number} amount - Monto de la orden de compra.
 * @property {number} budget_item_id - ID del rubro al que se asignó la orden de compra.
 * @property {number} project_id - ID del proyecto al que pertenece la orden de compra.
 */
const PurchaseOrder = sequelize.define('purchase_orders', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  supplier: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0.01 } },
  budget_item_id: { type: DataTypes.INTEGER, allowNull: false },
  project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false
});

/**
 * Define la relación entre PurchaseOrder y BudgetItem.
 * Una orden de compra está asignada a un único rubro.
 */
PurchaseOrder.belongsTo(BudgetItem, { foreignKey: 'budget_item_id' });

/**
 * Define la relación entre BudgetItem y PurchaseOrder.
 * Un rubro puede tener múltiples órdenes de compra asociadas.
 */
BudgetItem.hasMany(PurchaseOrder, { foreignKey: 'budget_item_id' });

/**
 * Define la relación entre PurchaseOrder y Project.
 * Una orden de compra pertenece a un único proyecto.
 */
PurchaseOrder.belongsTo(Project, { foreignKey: 'project_id' });

/**
 * Define la relación entre Project y PurchaseOrder.
 * Un proyecto puede tener múltiples órdenes de compra asociadas.
 */
Project.hasMany(PurchaseOrder, { foreignKey: 'project_id' });

module.exports = PurchaseOrder;
