const router = require("express").Router();
const {
  signup,
  login,
  editProfile,
} = require("../controllers/userControllers.js");

router.post("/signup", signup);
router.get("/login", login);
router.put("/edit", editProfile);

module.exports = router;
