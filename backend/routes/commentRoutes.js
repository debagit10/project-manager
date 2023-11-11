const {
  comment,
  viewComment,
  validate,
} = require("../controllers/commentController");

const router = require("express").Router();

router.post("/add", comment);
router.get("/view", viewComment);
router.put("/validate", validate);

module.exports = router;
