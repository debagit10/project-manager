import React, { useState } from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { APIURL } from "../env";
import { useCookies } from "react-cookie";

const Password = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();

  const config = { headers: { "Content-type": "application/json" } };

  const verify = async () => {
    if (!email) {
      setError("Please enter your email address");
    } else {
      try {
        const data = {
          email: email,
        };

        const response = await axios.get(`${APIURL}/api/user/get`, {
          params: data,
          headers: config.headers,
        });
        console.log(response.data);
        if (response.data.error) {
          setError("This email does not match any account");
        }
        console.log(response.data[0].id);
        setCookie("userID", response.data[0].id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const userID = cookies.userID;

  const submit = async () => {
    if (!newPassword || !confirmNewPassword) {
      setError("Please fill out these fields");
      return;
    } else if (newPassword != confirmNewPassword) {
      setError("Passwords do not match");
      return;
    } else {
      try {
        const data = {
          userID: userID,
          newPassword: newPassword,
        };

        const config = {
          "Content-type": "application/json",
        };

        const response = await axios.put(
          `${APIURL}/api/user/changePassword`,
          data,
          config
        );
        console.log(response);
      } catch {
        console.log(error);
      }
    }
  };

  return (
    <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
      <div className="container">
        <Paper elevation={4}>
          <div className="container">
            {!userID && (
              <form>
                <Typography variant="h6">
                  Verify your email to change your password
                </Typography>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  margin="normal"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    verify();
                    console.log(email);
                  }}
                >
                  Verify email
                </Button>
              </form>
            )}

            {userID && (
              <form>
                <Typography>
                  Email verified, now you can change your password.
                </Typography>
                <TextField
                  label="New password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  label="Confirm new password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <Button variant="outlined" color="primary" onClick={submit}>
                  Submit
                </Button>
              </form>
            )}
          </div>
          {error}
        </Paper>
      </div>
    </div>
  );
};

export default Password;
