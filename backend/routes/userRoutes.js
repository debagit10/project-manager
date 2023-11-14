const router = require("express").Router();
const {
  signup,
  login,
  editProfile,
  getUser,
  changePassword,
} = require("../controllers/userControllers.js");

router.post("/signup", signup);
router.get("/login", login);
router.put("/edit", editProfile);
router.get("/get", getUser);
router.put("/changePassword", changePassword);

module.exports = router;
