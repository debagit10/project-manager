import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import Authentication from "../pages/Authentication";
import { Box, Button, TextField, Typography } from "@mui/material";
import Logo2 from "../logo/Logo2.png";
import { APIURL } from "../env";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //const apiUrl = process.env.APIURL;

  const submit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-type": "application/json" } };

    const queryParams = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError("Please fill all fields");
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 2000, // Set the autoClose time in milliseconds
        hideProgressBar: false, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
      return;
    }
    setLoading(true);
    const response = await axios
      .get(`${APIURL}/api/user/login`, { params: queryParams })
      .then((response) => {
        const user = response.data;
        //console.log(response.data);

        if (user.error) {
          setError(user.error);
          setTimeout(() => {
            // After the operation is complete, set loading back to false
            setLoading(false);
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER, // Set the position
              autoClose: 2000, // Set the autoClose time in milliseconds
              hideProgressBar: false, // Set to true to hide the progress bar
              closeOnClick: true, // Close the toast when clicked
              pauseOnHover: true, // Pause the autoClose timer when hovering
              draggable: true, // Allow the toast to be dragged
            });
          }, 2000);
        } else {
          setCookie("Email", user.email);
          setCookie("Token", user.token);
          setCookie("userID", user.userID);
          setCookie("Name", user.name);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //console.log(email, password);
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
            <ToastContainer />
          </form>
          <Typography>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}> Sign up</a>
          </Typography>
          <Typography>
            <a onClick={() => navigate("/forgotPassword")}>Forgot password? </a>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
