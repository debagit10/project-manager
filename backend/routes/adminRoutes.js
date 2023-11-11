const { addAdmin, removeAdmin } = require("../controllers/adminControllers");

const router = require("express").Router();

router.put("/add", addAdmin);
router.put("/remove", removeAdmin);

module.exports = router;
