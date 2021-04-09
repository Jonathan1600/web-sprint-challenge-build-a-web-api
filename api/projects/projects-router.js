// Write your "projects" router here!
const express = require("express");
const mw = require("../middleware/middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.post("/", mw.validateProjectBody, (req, res) => {
    Projects.insert(req.body).then(project => {
        res.status(201).json(project);
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.put("/:id", mw.validateProjectId, mw.validateProjectBody, (req, res) => {
    const { id } = req.params
    Projects.update(id, req.body).then(project => {
        res.status(200).json({ ...project, message: "succesfully updated" });
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.delete("/:id", mw.validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.remove(id).then(() => {
        res.status(200).json({});
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.get("/:id/actions", (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.get("/:id", mw.validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});


router.get("/", (req, res) => {
    Projects.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).json(err.message);
    })
});





module.exports = router