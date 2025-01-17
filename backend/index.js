require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/project.route');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', projectRoutes);


sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log('Error connecting to database:', err));