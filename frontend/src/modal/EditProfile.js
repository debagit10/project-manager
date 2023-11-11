import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies();
  const [updatedName, setUpdatedName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [updatedPic, setUpdatedPic] = useState();

  const username = cookies.Name;
  const email = cookies.Email;
  const pic = cookies.Pic;
  const userID = cookies.userID;

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    const response = await axios.post(
      "http://localhost:5000/editProfile",
      config,
      { updatedName, updatedEmail, updatedPic, userID }
    );
    console.log(response);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="mb-2"
        sx={{ color: "black" }}
      >
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              value={username}
              fullWidth
              margin="normal"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <TextField
              value={email}
              fullWidth
              margin="normal"
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </form>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                submit();
              }}
            >
              Submit
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
