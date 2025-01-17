const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project.model');

const BudgetItem = sequelize.define('budget_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false
});

// Relación con Project
BudgetItem.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(BudgetItem, { foreignKey: 'project_id' });

module.exports = BudgetItem;
