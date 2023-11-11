import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Input } from "@mui/material";
import Logo2 from "../logo/Logo2.png";
import { CloudinaryContext, Image } from "cloudinary-react";
import { Cloudinary } from "cloudinary-core";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword || !email || !pic) {
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
        "http://localhost:5000/api/user/login",
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

  const cloudinaryCore = new Cloudinary({ cloud_name: "debacodes" });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat_app"); // Create an upload preset in your Cloudinary dashboard

    fetch(`https://api.cloudinary.com/v1_1/debacodes/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPic(data.secure_url); // Pass the URL to your parent component

        setPic(
          cloudinaryCore.url(data.public_id, {
            width: 150,
            height: 150,
            crop: "fill",
          })
        );
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  console.log(pic);

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

              <input
                accept="image/*"
                //style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={handleUpload}
              />
              {pic && (
                <Image
                  cloudName="debacodes"
                  publicId={pic}
                  width="150"
                  height="150"
                />
              )}

              <br />
              <Button variant="contained" color="primary" onClick={submit}>
                Sign Up
              </Button>
            </form>
            {error}
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
