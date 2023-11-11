const pool = require("../db.js");

const addAdmin = async (req, res) => {
  const { itemID, teamID } = req.body;
  try {
    const response = await pool.query(
      "UPDATE team_members SET min_admin = 'true' WHERE member_id = $1 AND team_id = $2",
      [itemID, teamID]
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const removeAdmin = async (req, res) => {
  const { itemID, teamID } = req.body;
  try {
    const response = await pool.query(
      "UPDATE team_members SET min_admin = NULL WHERE member_id = $1 AND team_id = $2",
      [itemID, teamID]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addAdmin, removeAdmin };
