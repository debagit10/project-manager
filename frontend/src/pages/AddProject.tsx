import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const Addproject = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [document, setDocument] = useState();
  const [links, setLinks] = useState();
  const [deadline, setDeadline] = useState();

  const navigate = useNavigate();

  const name = cookies.itemName;
  const itemID = cookies.itemID;
  const userID = cookies.userID;
  const team = cookies.teamID;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    const response = await axios.post(
      "http://localhost:5000/addProject",
      {
        itemID,
        userID,
        title,
        description,
        document,
        links,
        deadline,
        team,
      },
      config
    );
    console.log(response);
  };

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          <div className="container">
            <Typography variant="h5">Assign a project to {name}</Typography>
            <Paper elevation={4}>
              <div className="container">
                <form>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Document"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Link(s)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {/*<input
                  type="datetime-local"
                  onChange={(e) => setDeadline(e.target.value)}
  />*/}

                  <Button variant="outlined" color="primary" onClick={submit}>
                    Submit
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </Container>
  );
};

export default Addproject;
