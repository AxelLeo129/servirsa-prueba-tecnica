const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project.model');
const BudgetItem = require('./budget-item.model');

/**
 * Modelo de Donaciones (Donation).
 * Representa las donaciones realizadas a un proyecto y asignadas a un rubro específico.
 * 
 * @typedef {Object} Donation
 * @property {number} id - Identificador único de la donación.
 * @property {Date} date - Fecha en la que se realizó la donación.
 * @property {string} donor - Nombre del donante.
 * @property {number} amount - Monto donado.
 * @property {number} budget_item_id - ID del rubro al que se asignó la donación.
 * @property {number} project_id - ID del proyecto al que pertenece la donación.
 */
const Donation = sequelize.define('donations', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  donor: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0.01 } },
  budget_item_id: { type: DataTypes.INTEGER, allowNull: false },
  project_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false
});

/**
 * Define la relación entre Donation y BudgetItem.
 * Una donación está asignada a un único rubro.
 */
Donation.belongsTo(BudgetItem, { foreignKey: 'budget_item_id' });

/**
 * Define la relación entre BudgetItem y Donation.
 * Un rubro puede recibir múltiples donaciones.
 */
BudgetItem.hasMany(Donation, { foreignKey: 'budget_item_id' });

/**
 * Define la relación entre Donation y Project.
 * Una donación pertenece a un único proyecto.
 */
Donation.belongsTo(Project, { foreignKey: 'project_id' });

/**
 * Define la relación entre Project y Donation.
 * Un proyecto puede recibir múltiples donaciones.
 */
Project.hasMany(Donation, { foreignKey: 'project_id' });

module.exports = Donation;
