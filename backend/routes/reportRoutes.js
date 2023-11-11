const {
  projectReport,
  getReport,
} = require("../controllers/reportControllers");

const router = require("express").Router();

router.post("/add", projectReport);
router.get("/get", getReport);

module.exports = router;
