exports.getAllProjects = async (req, res) => {
  try {
    // const projects = await Project.find();
    // res.status(200).json(projects);
    console.log('Listando proyectos');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}