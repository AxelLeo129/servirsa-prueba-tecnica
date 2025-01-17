const express = require('express');
const morgan = require('morgan');

const app = express();

const projectRoutes = require('./routes/project.route');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/projects', projectRoutes);
app.use(morgan('dev'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});