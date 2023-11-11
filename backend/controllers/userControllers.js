const express = require("express");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db.js");

const signup = async (req, res) => {
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

    res.json({ email, name, token, id, pic });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.query;

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
};

const editProfile = async (req, res) => {
  const { updatedName, updatedEmail, updatedPic, userID } = req.body;
  try {
    const response = await pool.query(
      "UPDATE users SET name = $1, email = $2, pic = $3 WHERE id = $4",
      [updatedName, updatedEmail, updatedPic, userID]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login, editProfile };
