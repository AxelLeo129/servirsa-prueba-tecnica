require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/database');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const projectRoutes = require('./routes/project.route');
const budgetItemRoutes = require('./routes/budget-item.route');
const donationRoutes = require('./routes/donation.route');
const purchaseOrderRoutes = require('./routes/purchase-order.route');

const app = express();

/**
 * Middleware para registrar las solicitudes HTTP en la consola.
 * Se utiliza Morgan en modo 'dev' para mostrar detalles de las solicitudes.
 */
app.use(morgan('dev'));

/**
 * Middleware para habilitar el soporte de JSON en las solicitudes HTTP.
 */
app.use(express.json());

/**
 * Rutas de la API.
 * Se definen las rutas base para cada entidad del sistema.
 */
app.use('/api', projectRoutes);
app.use('/api/budget-items', budgetItemRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

/**
 * Configuración de Swagger para la documentación de la API.
 * Se puede acceder en la ruta `/api-docs`.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Conexión con la base de datos y lanzamiento del servidor.
 * @async
 */
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log('Error connecting to database:', err));