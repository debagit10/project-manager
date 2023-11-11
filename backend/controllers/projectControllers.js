const { v4: uuidv4 } = require("uuid");

const pool = require("../db.js");

const addProject = async (req, res) => {
  const {
    userID,
    itemID,
    title,
    description,
    document,
    links,
    deadline,
    team,
  } = req.body;

  const id = uuidv4();

  const date = Date.now();

  try {
    const response = await pool.query(
      "INSERT INTO projects(project_id,title,assigned_by,assigned_to,description,document,link,date_given,deadline, team) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)",
      [
        id,
        title,
        userID,
        itemID,
        description,
        document,
        links,
        date,
        deadline,
        team,
      ]
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { userID } = req.query;

  try {
    const response = await pool.query(
      "SELECT project_id,title,description,document,link,date_given,deadline,assigned_by,done,assigned_to,users.name,teams.team_name FROM projects INNER JOIN users ON projects.assigned_by = users.id INNER JOIN teams ON projects.team = teams.team_id WHERE assigned_to = $1 OR assigned_by = $1",
      [userID]
    );
    //console.log(response);
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProject, getProject };
