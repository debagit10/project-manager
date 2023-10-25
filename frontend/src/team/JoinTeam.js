import React, { useState } from "react";
import { useCookies } from "react-cookie";
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
  const [teamID, setTeamID] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const userID = cookies.userID;

  const submit = async () => {
    if (!teamID) {
      setError("Please insert team's ID");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/joinTeam",
        { userID, teamID },
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
                onChange={(e) => setTeamID(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Join</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        {error}
      </Dialog>
    </>
  );
};

export default JoinTeam;
