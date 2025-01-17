const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.createProject);

module.exports = router;
