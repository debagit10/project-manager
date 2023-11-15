import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { APIURL } from "../env";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;

  const submit = async () => {
    if (!name || !about) {
      toast.warning("Please fill all fields", {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 3000, // Set the autoClose time in milliseconds
        hideProgressBar: true, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { "Content-type": "application/json" } };
      const data = {
        name: name,
        about: about,
        userID: userID,
        username: username,
      };
      const response = await axios.post(
        `${APIURL}/api/team/create`,
        data,
        config
      );
      const team = response.data;
      //console.log(team);
      if (team.error) {
        setTimeout(() => {
          // After the operation is complete, set loading back to false
          setLoading(false);
          toast.error(team.error, {
            position: toast.POSITION.TOP_CENTER, // Set the position
            autoClose: 3000, // Set the autoClose time in milliseconds
            hideProgressBar: true, // Set to true to hide the progress bar
            closeOnClick: true, // Close the toast when clicked
            pauseOnHover: true, // Pause the autoClose timer when hovering
            draggable: true, // Allow the toast to be dragged
          });
        }, 2000);
      } else {
        navigate("/teams");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" className="mb-2">
        Create Team
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Create Team</DialogTitle>
        <DialogContent>
          <div className="container">
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="About"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setAbout(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create"
            )}
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <ToastContainer />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTeam;
