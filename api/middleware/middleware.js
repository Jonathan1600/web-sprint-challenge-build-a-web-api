const Projects = require("../projects/projects-model");
const Actions = require("../actions/actions-model");

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

const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({ message: "The action with the id provided does not exist" })
        } else {
            req.action = action
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

const validateActionBody = async (req, res, next) => {
    const body = req.body;
    if (!body.project_id || !body.description || body.description.length > 128 || !body.notes) {
        res.status(400).json({ message: "Project Id, Description and Notes are required. Description must be less than 128 characters." });
    } else {
        next();
    }
}








module.exports = {
    validateProjectId,
    validateProjectBody,
    validateActionId,
    validateActionBody
}