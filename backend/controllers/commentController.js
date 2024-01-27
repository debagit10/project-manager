const pool = require("../db.js");
const { v4: uuidv4 } = require("uuid");

const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

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
  const { projectID, assigned_to_email, team, title } = req.body;

  try {
    const response = await pool.query(
      "UPDATE projects SET done = 'true' WHERE project_id = $1",
      [projectID]
    );
    res.json(response);
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
        to: assigned_to_email, // list of receivers
        subject: "Project validation", // Subject line
        text: ``, // plain text body
        html: `Your project: ${title} has been validated on team: ${team}, good work!!`, // html body
      };

      transporter.sendMail(message);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { comment, viewComment, validate };
