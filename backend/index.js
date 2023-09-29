const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Api working");
});

app.post("/signup", async (req, res) => {
  const { email, name, password, pic } = req.body;
  console.log(email, name, password);
  const id = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length) {
      res.send({ error: "User exists" });
      console.log({ error: "User exists" });
    }

    const signup = await pool.query(
      "INSERT INTO users(id,email,name,password,pic) VALUES($1, $2, $3, $4, $5)",
      [id, email, name, hashed_password, pic]
    );
    console.log(signup);
    //res.send(signup);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, name, token, id });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length) {
      res.send({ error: "This user does not exist" });
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    const success = await bcrypt.compare(password, users.rows[0].password);
    if (success) {
      res.json({
        email: users.rows[0].email,
        token,
        name: users.rows[0].name,
        userID: users.rows[0].id,
      });
    } else {
      res.json({ error: "Incorrect password" });
    }
    console.log(success);
  } catch (error) {
    console.log(error);
  }
});

app.post("/createTeam", async (req, res) => {
  const { name, about, userID, username } = req.body;
  const id = uuidv4();
  try {
    const team = await pool.query("SELECT * FROM teams WHERE team_name = $1", [
      name,
    ]);

    if (team.rows.length) {
      res.send({ error: "Team name exists" });
      console.log({ error: "Team name exists" });
    } else {
      const create = await pool.query(
        "INSERT INTO teams(team_id,team_name,about,admin,admin_id) VALUES($1,$2,$3,$4,$5)",
        [id, name, about, username, userID]
      );

      const add = await pool.query(
        "INSERT INTO team_members(member_id, team_id) VALUES($1,$2)",
        [userID, id]
      );

      res.json({ id, name, about, userID });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/joinTeam", async (req, res) => {
  const { teamID, userID } = req.body;
  try {
    const members = await pool.query(
      "SELECT member_id FROM team_members WHERE team_id = $1 AND member_id = $2",
      [teamID, userID]
    );
    if (members.rows.length) {
      res.json({ error: "User already in team" });
      return;
    }
    console.log(members.rows);
    const team = await pool.query("SELECT * FROM teams WHERE team_id = $1", [
      teamID,
    ]);

    if (!team.rows.length) {
      res.json({ error: "Team does not exist" });
    } else {
      const join = await pool.query(
        "INSERT INTO team_members(member_id, team_id) VALUES($1,$2)",
        [userID, teamID]
      );
      console.log(join);
      res.json({ teamID, userID });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/getTeams", async (req, res) => {
  const { userID } = req.body;
  try {
    const team = await pool.query(
      "SELECT teams.team_id, teams.team_name, teams.about, teams.admin, teams.admin_id FROM teams INNER JOIN team_members ON teams.team_id = team_members.team_id INNER JOIN users ON team_members.member_id = users.id WHERE users.id = $1;",
      [userID]
    );
    res.json(team.rows);
    //console.log(team.rows);
    if (!team) {
      res.json({
        error: "You do not belong to any team yet. Join or create one.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/viewTeam", async (req, res) => {
  const { teamID } = req.body;
  try {
    const response = await pool.query(
      "SELECT teams.team_name, teams.about, teams.admin, teams.admin_id, users.name, users.id, team_members.min_admin FROM teams INNER JOIN team_members ON teams.team_id = team_members.team_id INNER JOIN users ON team_members.member_id = users.id WHERE team_members.team_id = $1",
      [teamID]
    );

    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addAdmin", async (req, res) => {
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
});

app.post("/addProject", async (req, res) => {
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
});

app.post("/getProject", async (req, res) => {
  const { userID } = req.body;

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
});

app.post("/viewProject", async (req, res) => {
  const { projectID } = req.body;

  try {
    const response = await pool.query(
      "SELECT project_id,title,description,document,link,date_given,deadline,users.name,teams.team_name FROM projects INNER JOIN users ON projects.assigned_by = users.id INNER JOIN teams ON projects.team = teams.team_id WHERE projects.project_id = $1",
      [projectID]
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/removeMember", async (req, res) => {
  const { itemID, teamID } = req.body;
  try {
    const response = await pool.query(
      "DELETE FROM team_members WHERE member_id = $1 AND team_id = $2",
      [itemID, teamID]
    );

    const admin = await pool.query(
      "SELECT * FROM min_admin WHERE team_id = $1 AND min_admin_id = $2",
      [itemID, teamID]
    );

    if (admin) {
      const remove = await pool.query(
        "DELETE FROM min_admin WHERE min_admin_id = $1 AND team_id = $2",
        [itemID, teamID]
      );
    }

    const project = await pool.query(
      "SELECT * FROM projects WHERE assigned_to = $1 AND team = $2",
      [itemID, teamID]
    );

    if (project) {
      const clear = await pool.query(
        "DELETE FROM projects WHERE assigned_to = $1 AND team = $2",
        [itemID, teamID]
      );
    }

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/leaveTeam", async (req, res) => {
  const { userID, teamID } = req.body;
  try {
    const response = await pool.query(
      "DELETE FROM team_members WHERE member_id = $1 AND team_id = $2",
      [userID, teamID]
    );

    const project = await pool.query(
      "SELECT * FROM projects WHERE assigned_to = $1 AND team = $2",
      [userID, teamID]
    );

    if (project) {
      const clear = await pool.query(
        "DELETE FROM projects WHERE assigned_to = $1 AND team = $2",
        [userID, teamID]
      );
    }

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteTeam", async (req, res) => {
  const { teamID } = req.body;
  try {
    const response = await pool.query("DELETE FROM teams WHERE team_id = $1", [
      teamID,
    ]);
    res.json(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/teamProject", async (req, res) => {
  const { teamID } = req.body;
  try {
    const response = await pool.query(
      "SELECT project_id,title,date_given,deadline,done,users.name,teams.team_name FROM projects INNER JOIN users ON projects.assigned_to = users.id INNER JOIN teams ON projects.team = teams.team_id WHERE team = $1",
      [teamID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/projectReport", async (req, res) => {
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
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/getReport", async (req, res) => {
  const { projectID } = req.body;

  try {
    const response = await pool.query(
      "SELECT * FROM project_report WHERE project_id = $1",
      [projectID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/comment", async (req, res) => {
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
});

app.post("/viewComment", async (req, res) => {
  const { projectID } = req.body;
  try {
    const response = await pool.query(
      "SELECT * FROM report_comment WHERE project_id = $1",
      [projectID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/validate", async (req, res) => {
  const { projectID } = req.body;

  try {
    const response = await pool.query(
      "UPDATE projects SET done = 'true' WHERE project_id = $1",
      [projectID]
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`App listening on port ${PORT}`));
