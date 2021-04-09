// Write your "actions" router here!
// Write your "projects" router here!
const express = require("express");
const mw = require("../middleware/middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.post("/", mw.validateActionBody, (req, res) => {
    Actions.insert(req.body).then(action => {
        res.status(201).json(action);
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.put("/:id", mw.validateActionId, mw.validateActionBody, (req, res) => {
    const { id } = req.params
    Actions.update(id, req.body).then(project => {
        res.status(200).json({ ...project, message: "succesfully updated" });
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.delete("/:id", mw.validateActionId, (req, res) => {
    const { id } = req.params
    Actions.remove(id).then(() => {
        res.status(200).json({})
    }).catch(err => {
        res.status(500).json(err.message);
    })
});

router.get("/:id", mw.validateActionId, (req, res) => {
    res.status(200).json(req.action);
});


router.get("/", (req, res) => {
    Actions.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).json(err.message);
    })
});





module.exports = router