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

const JoinTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [teamCode, setTeamCode] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const userID = cookies.userID;

  const navigate = useNavigate();

  const submit = async () => {
    if (!teamCode) {
      setError("Please insert team's code");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/joinTeam",
        { userID, teamCode },
        config
      );
      const join = response.data;
      console.log(response.data);
      if (join.error) {
        setError(join.error);
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
              //setOpen(false);
            }}
          >
            Join
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        {error}
      </Dialog>
    </>
  );
};

export default JoinTeam;
