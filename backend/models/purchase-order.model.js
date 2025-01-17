const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project.model');
const BudgetItem = require('./budget-item.model');

const PurchaseOrder = sequelize.define('purchase_orders', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  supplier: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0.01 } },
  budget_item_id: { type: DataTypes.INTEGER, allowNull: false },
  project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false // ❌ Evita `createdAt` y `updatedAt`
});

// Relación con BudgetItem y Project
PurchaseOrder.belongsTo(BudgetItem, { foreignKey: 'budget_item_id' });
BudgetItem.hasMany(PurchaseOrder, { foreignKey: 'budget_item_id' });

PurchaseOrder.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(PurchaseOrder, { foreignKey: 'project_id' });

module.exports = PurchaseOrder;
