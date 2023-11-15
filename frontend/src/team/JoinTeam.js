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

const JoinTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [teamCode, setTeamCode] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userID = cookies.userID;

  const navigate = useNavigate();

  const submit = async () => {
    if (!teamCode) {
      toast.warning("Please insert team code", {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 3000, // Set the autoClose time in milliseconds
        hideProgressBar: true, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
      return;
    }

    const config = { headers: { "Content-type": "application/json" } };
    const data = {
      teamCode: teamCode,
      userID: userID,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `${APIURL}/api/team/join`,
        data,
        config
      );
      const join = response.data;
      console.log(response.data);
      if (join.error) {
        setTimeout(() => {
          // After the operation is complete, set loading back to false
          setLoading(false);
          toast.error(join.error, {
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
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" className="mb-2">
        Join Team
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Join Team</DialogTitle>
        <DialogContent>
          <div className="container">
            <form>
              <TextField
                label="Team ID"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setTeamCode(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              submit();
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Join"}
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </>
  );
};

export default JoinTeam;
