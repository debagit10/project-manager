const pool = require("../db.js");
const { v4: uuidv4 } = require("uuid");

const projectReport = async (req, res) => {
  const { title, project_id, summary, deadline, assigned_by, userID, report } =
    req.body;

  const date = Date.now();
  const id = uuidv4();
  try {
    const check = await pool.query(
      "SELECT * FROM project_report WHERE project_id = $1",
      [project_id]
    );
    console.log(check.rows.length);
    if (!check.rows.length) {
      const response = await pool.query(
        "INSERT INTO project_report(report_id,project_id,title,summary,assigned_to,assigned_by,deadline,date_submitted,report) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [
          id,
          project_id,
          title,
          summary,
          userID,
          assigned_by,
          deadline,
          date,
          report,
        ]
      );
      res.json(response);
      //console.log(response);
    } else {
      const update = await pool.query(
        "UPDATE project_report SET summary = $1, report = $2 WHERE project_id = $3",
        [summary, report, project_id]
      );
      res.send(update);
    }
  } catch (error) {
    console.log(error);
  }
};

const getReport = async (req, res) => {
  const { projectID } = req.query;

  try {
    const response = await pool.query(
      "SELECT * FROM project_report WHERE project_id = $1",
      [projectID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { projectReport, getReport };
