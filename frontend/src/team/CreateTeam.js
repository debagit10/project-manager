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

const CreateTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;

  const submit = async () => {
    if (!name || !about) {
      setError("Please fill out all fields");
    }

    const config = { headers: { "Content-type": "application/json" } };
    const data = {
      name: name,
      about: about,
      userID: userID,
      username: username,
    };
    try {
      const response = await axios.post(
        `${APIURL}/api/team/create`,
        data,
        config
      );
      const team = response.data;
      //console.log(team);
      if (team.error) {
        setError(team.error);
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
          <Button onClick={submit}>Create</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        {error}
      </Dialog>
    </>
  );
};

export default CreateTeam;
