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
  code: { type: DataTypes.STRING, unique: true, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false },
  municipality: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false
});

/**
 * Middleware para generar el código antes de crear un proyecto.
 */
Project.beforeCreate(async (project) => {
  console.log('here')
  const lastProject = await Project.findOne({ order: [['id', 'DESC']] });

  let nextNumber = 1;
  if (lastProject && lastProject.code) {
    const lastCode = lastProject.code.split('-')[1]; // Extrae el número del código
    nextNumber = parseInt(lastCode, 10) + 1;
  }

  project.code = `P-${String(nextNumber).padStart(4, '0')}`;
});

module.exports = Project;
