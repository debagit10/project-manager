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

import { APIURL } from "../env";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [cookies, setCookie, removeCookies] = useCookies();

  const username = cookies.Name;
  const email = cookies.Email;
  const pic = cookies.Pic;
  const userID = cookies.userID;

  const [open, setOpen] = useState(false);

  const [updatedName, setUpdatedName] = useState(username);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPic, setUpdatedPic] = useState();
  const [loading, setLoading] = useState(false);

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    const data = {
      updatedName,
      updatedEmail,
      updatedPic,
      userID,
    };

    const config = {
      headers: { "Content-type": "application/json" },
    };

    try {
      setLoading(true);
      const response = await axios.put(`${APIURL}/api/user/edit`, data, config);
      if (response.data.command == "UPDATE") {
        setTimeout(() => {
          setLoading(false);
          toast.success("Profile updated", {
            position: toast.POSITION.TOP_CENTER, // Set the position
            autoClose: 2000, // Set the autoClose time in milliseconds
            hideProgressBar: true, // Set to true to hide the progress bar
            closeOnClick: true, // Close the toast when clicked
            pauseOnHover: true, // Pause the autoClose timer when hovering
            draggable: true, // Allow the toast to be dragged
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
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
              value={updatedName}
              fullWidth
              margin="normal"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <TextField
              value={updatedEmail}
              fullWidth
              margin="normal"
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </form>
          <DialogActions>
            <Button
              onClick={() => {
                submit();
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
          <ToastContainer />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
