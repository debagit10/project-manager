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

    res.json({ email, name, token });
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
        name: users.rows[0].username,
      });
    } else {
      res.json({ error: "Incorrect password" });
    }
    console.log(success);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`App listening on port ${PORT}`));
