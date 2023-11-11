const { addProject, getProject } = require("../controllers/projectControllers");

const router = require("express").Router();

router.post("/add", addProject);
router.get("/get", getProject);

module.exports = router;
