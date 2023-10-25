import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import Authentication from "../pages/Authentication";
import { Box, Button, TextField, Typography } from "@mui/material";
import Logo2 from "../logo/Logo2.png";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-type": "application/json" } };

    if (!email || !password) {
      setError("Please fill all fields");
    } else {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        config
      );
      const user = response.data;
      console.log(response.data);
      if (user.error) {
        setError(user.error);
      } else {
        setCookie("Email", user.email);
        setCookie("Token", user.token);
        setCookie("userID", user.userID);
        setCookie("Name", user.name);
        navigate("/home");
      }
      //console.log(email, password);
    }
  };

  return (
    <div className="bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
      <div className="container">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          //height="100vh"
          sx={{ marginTop: "" }}
        >
          <div className="m-3">
            <img src={Logo2} alt="Nithub logo" className="w-72" />
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              className="italic"
            >
              project management platform.
            </Typography>
          </div>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={submit}>
              Login
            </Button>
          </form>
          <Typography>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}> Sign up</a>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
