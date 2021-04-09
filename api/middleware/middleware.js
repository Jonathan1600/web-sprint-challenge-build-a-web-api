const Projects = require("../projects/projects-model");

const validateProjectId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({ message: "The project with the id provided does not exist" })
        } else {
            req.project = project
            next()
        }
    } catch (e) {
        res.status(500).json(e.message)
    }
}

const validateProjectBody = async (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.description) {
        res.status(400).json({ message: "Name and Description are required" });
    } else {
        next();
    }
}








module.exports = {
    validateProjectId,
    validateProjectBody
}