const { v4: uuidv4 } = require("uuid");

const pool = require("../db.js");

const nodemailer = require("nodemailer");

require("dotenv").config();

const { EMAIL, PASSWORD } = process.env;

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
    itemEmail,
  } = req.body;

  const id = uuidv4();

  const date = Date.now();

  try {
    const response = await pool.query(
      "INSERT INTO projects(project_id,title,assigned_by,assigned_to,description,document,link,date_given,deadline, team, assigned_to_email) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10, $11)",
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
        itemEmail,
      ]
    );
    res.json(response);
    console.log(itemEmail, EMAIL, PASSWORD);
    if (response) {
      let config = {
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let message = {
        from: EMAIL, // sender address
        to: itemEmail, // list of receivers
        subject: "New project", // Subject line
        text: `You've been assigned a new project on team: ${team}`, // plain text body
        html: `Check the project http://localhost:3000`, // html body
      };

      transporter.sendMail(message);
    }
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { userID } = req.query;

  try {
    const response = await pool.query(
      "SELECT project_id,title,description,document,link,date_given,deadline,assigned_by,done,assigned_to, assigned_to_email,users.name,users.email,teams.team_name FROM projects INNER JOIN users ON projects.assigned_by = users.id INNER JOIN teams ON projects.team = teams.team_id WHERE assigned_to = $1 OR assigned_by = $1",
      [userID]
    );
    //console.log(response);
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProject, getProject };
