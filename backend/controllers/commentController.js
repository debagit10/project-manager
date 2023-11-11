const pool = require("../db.js");
const { v4: uuidv4 } = require("uuid");

const comment = async (req, res) => {
  const { comment, projectID } = req.body;
  const id = uuidv4();
  try {
    const response = await pool.query(
      "INSERT INTO report_comment(id,comment,project_id) VALUES($1,$2,$3)",
      [id, comment, projectID]
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const viewComment = async (req, res) => {
  const { projectID } = req.query;
  try {
    const response = await pool.query(
      "SELECT * FROM report_comment WHERE project_id = $1",
      [projectID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

const validate = async (req, res) => {
  const { projectID } = req.body;

  try {
    const response = await pool.query(
      "UPDATE projects SET done = 'true' WHERE project_id = $1",
      [projectID]
    );
    res.json(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { comment, viewComment, validate };
