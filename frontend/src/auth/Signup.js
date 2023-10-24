import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import Authentication from "../pages/Authentication";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword || !email) {
      setError("Please fill all fields");
      return;
    } else {
      if (password != confirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        console.log(email, name, password);
      }
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          name,
          password,
        },
        config
      );
      const user = response.data;
      console.log(response.data);
      if (user.error) {
        setError(user.error);
        return;
      } else {
        setCookie("Email", user.email);
        setCookie("Token", user.token);
        setCookie("userID", user.id);
        setCookie("Name", user.name);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
      <div className="container">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          // height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
          <Typography>
            Already have an account?
            <a onClick={() => navigate("/login")}> Login</a>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
