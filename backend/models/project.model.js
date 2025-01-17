const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

// Middleware para generar el código antes de crear el proyecto
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
