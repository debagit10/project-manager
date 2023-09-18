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
      console.log(create);
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
      "SELECT teams.team_name, teams.about, teams.admin, teams.admin_id FROM teams INNER JOIN team_members ON teams.team_id = team_members.team_id INNER JOIN users ON team_members.member_id = users.id WHERE users.id = $1;",
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

app.listen(PORT, console.log(`App listening on port ${PORT}`));
