const { v4: uuidv4 } = require("uuid");
const pool = require("../db.js");

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomCode(length) {
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

const randomCode = generateRandomCode(6);

const createTeam = async (req, res) => {
  const { name, about, userID, username } = req.body;
  const id = uuidv4();
  const teamCode = randomCode;
  try {
    const team = await pool.query("SELECT * FROM teams WHERE team_name = $1", [
      name,
    ]);

    if (team.rows.length) {
      res.send({ error: "Team name exists" });
      console.log({ error: "Team name exists" });
    } else {
      const create = await pool.query(
        "INSERT INTO teams(team_id,team_name,about,admin,admin_id, team_code) VALUES($1,$2,$3,$4,$5,$6)",
        [id, name, about, username, userID, teamCode]
      );

      const add = await pool.query(
        "INSERT INTO team_members(member_id, team_id) VALUES($1,$2)",
        [userID, id]
      );

      res.json({ id, name, about, userID, teamCode });
    }
  } catch (error) {
    console.log(error);
  }
};

const joinTeam = async (req, res) => {
  const { teamCode, userID } = req.body;

  try {
    const check = await pool.query("SELECT * FROM teams WHERE team_code = $1", [
      teamCode,
    ]);
    //console.log(check);
    if (!check.rows.length) {
      res.json({ error: "Team does not exist" });
      return;
    } else {
      const teamID = check.rows[0].team_id;

      const members = await pool.query(
        "SELECT member_id FROM team_members WHERE team_id= $1 AND member_id = $2",
        [teamID, userID]
      );

      if (members.rows.length) {
        res.json({ error: "User already in team" });
        return;
      }

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
    }

    console.log(members.rows);
  } catch (error) {
    console.log(error);
  }
};

const getTeams = async (req, res) => {
  const { userID } = req.query;
  try {
    const team = await pool.query(
      "SELECT teams.team_id, teams.team_name, teams.about, teams.admin, teams.admin_id, teams.team_code FROM teams INNER JOIN team_members ON teams.team_id = team_members.team_id INNER JOIN users ON team_members.member_id = users.id WHERE users.id = $1;",
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
};

const viewTeam = async (req, res) => {
  const { teamID } = req.query;
  try {
    const response = await pool.query(
      "SELECT teams.team_name, teams.about, teams.admin, teams.admin_id, users.name, users.id, users.email, team_members.min_admin FROM teams INNER JOIN team_members ON teams.team_id = team_members.team_id INNER JOIN users ON team_members.member_id = users.id WHERE team_members.team_id = $1",
      [teamID]
    );

    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

const removeMember = async (req, res) => {
  const { itemID, teamID } = req.query;
  try {
    const response = await pool.query(
      "DELETE FROM team_members WHERE member_id = $1 AND team_id = $2",
      [itemID, teamID]
    );

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
};

const leaveTeam = async (req, res) => {
  const { userID, teamID } = req.query;
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
};

const deleteTeam = async (req, res) => {
  const { teamID } = req.query;
  try {
    const response = await pool.query("DELETE FROM teams WHERE team_id = $1", [
      teamID,
    ]);
    res.json(response);
    //console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const teamProjects = async (req, res) => {
  const { teamID } = req.query;
  try {
    const response = await pool.query(
      "SELECT project_id,title,date_given,deadline,done,users.name,teams.team_name FROM projects INNER JOIN users ON projects.assigned_to = users.id INNER JOIN teams ON projects.team = teams.team_id WHERE team = $1",
      [teamID]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

const admin = async (req, res) => {
  const { teamID, userID } = req.query;
  try {
    const response = await pool.query(
      "SELECT min_admin FROM team_members WHERE member_id = $1 AND team_id = $2",
      [userID, teamID]
    );
    res.json(response.rows);
  } catch (error) {
    consolr.log(error);
  }
};

module.exports = {
  createTeam,
  joinTeam,
  getTeams,
  viewTeam,
  removeMember,
  leaveTeam,
  deleteTeam,
  teamProjects,
  admin,
};
