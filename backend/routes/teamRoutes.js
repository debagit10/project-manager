const router = require("express").Router();
const {
  createTeam,
  getTeams,
  joinTeam,
  viewTeam,
  removeMember,
  leaveTeam,
  deleteTeam,
  teamProjects,
  admin,
} = require("../controllers/teamControllers");

router.post("/create", createTeam);
router.get("/get", getTeams);
router.post("/join", joinTeam);
router.get("/view", viewTeam);
router.delete("/removeMember", removeMember);
router.delete("/leave", leaveTeam);
router.delete("/delete", deleteTeam);
router.get("/projects", teamProjects);
router.get("/admin", admin);

module.exports = router;
