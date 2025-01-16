const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project.model');

/**
 * Modelo de Rubros (BudgetItem).
 * Representa los rubros dentro de un proyecto específico.
 * 
 * @typedef {Object} BudgetItem
 * @property {number} id - Identificador único del rubro.
 * @property {string} name - Nombre del rubro.
 * @property {number} project_id - ID del proyecto al que pertenece el rubro.
 */
const BudgetItem = sequelize.define('budget_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false
});

/**
 * Define la relación entre BudgetItem y Project.
 * Un rubro pertenece a un único proyecto.
 */
BudgetItem.belongsTo(Project, { foreignKey: 'project_id' });

/**
 * Define la relación entre Project y BudgetItem.
 * Un proyecto puede tener múltiples rubros.
 */

Project.hasMany(BudgetItem, { foreignKey: 'project_id' });

module.exports = BudgetItem;
