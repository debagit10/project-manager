import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Input,
  formGroupClasses,
} from "@mui/material";
import Logo2 from "../logo/Logo2.png";
import { APIURL } from "../env";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { POSTGRES_URL } = process.env;

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword || !email) {
      toast.error("Please fill all fields", {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 2000, // Set the autoClose time in milliseconds
        hideProgressBar: true, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
      return;
    } else {
      if (password != confirmPassword) {
        toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_CENTER, // Set the position
          autoClose: 2000, // Set the autoClose time in milliseconds
          hideProgressBar: true, // Set to true to hide the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the autoClose timer when hovering
          draggable: true, // Allow the toast to be dragged
        });

        return;
      } else {
        console.log(email, name, password);
      }
    }

    const data = {
      name: name,
      password: password,
      email: email,
      pic: pic,
    };

    const config = { headers: { "Content-type": "application/json" } };
    try {
      setLoading(true);
      const response = await axios.post(
        `${APIURL}/api/user/signup`,
        data,
        config
      );
      const user = response.data;
      //console.log(response.data);
      if (user.error) {
        setTimeout(() => {
          setLoading(false);
          toast.error(user.error, {
            position: toast.POSITION.TOP_CENTER, // Set the position
            autoClose: 2000, // Set the autoClose time in milliseconds
            hideProgressBar: true, // Set to true to hide the progress bar
            closeOnClick: true, // Close the toast when clicked
            pauseOnHover: true, // Pause the autoClose timer when hovering
            draggable: true, // Allow the toast to be dragged
          });
        }, 2000);

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
    <div className="bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
      <div className="container">
        <div className="p-3">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"

            // height="100vh"
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
              Sign Up
            </Typography>
            <form>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setName(e.target.value)}
              />
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
              <TextField
                label="Confirm password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
            <ToastContainer />
            <Typography className="mt-3">
              Already have an account?
              <a onClick={() => navigate("/login")}> Login</a>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;
