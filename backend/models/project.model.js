const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Modelo de Proyectos (Project).
 * Representa los proyectos dentro del sistema de gestión de fondos.
 * 
 * @typedef {Object} Project
 * @property {number} id - Identificador único del proyecto.
 * @property {string} code - Código único autogenerado del proyecto (Ejemplo: "P-0001").
 * @property {string} name - Nombre del proyecto.
 * @property {string} municipality - Municipio donde se desarrolla el proyecto.
 * @property {string} department - Departamento donde se desarrolla el proyecto.
 * @property {Date} start_date - Fecha de inicio del proyecto.
 * @property {Date} end_date - Fecha de finalización del proyecto.
 */
const Project = sequelize.define('projects', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  municipality: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
});

/**
 * Middleware que genera un código único para cada proyecto antes de ser creado.
 * El código sigue el formato "P-0001", "P-0002", etc.
 */
Project.beforeCreate(async (project) => {
  const lastProject = await Project.findOne({ order: [['id', 'DESC']] });
  const lastCode = lastProject ? lastProject.code : null;
  
  let nextNumber = 1;
  if (lastCode) {
    nextNumber = parseInt(lastCode.split('-')[1]) + 1;
  }

  project.code = `P-${String(nextNumber).padStart(4, '0')}`;
});

module.exports = Project;
