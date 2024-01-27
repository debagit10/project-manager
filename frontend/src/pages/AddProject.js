import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";
import { Button, Paper, TextField, Typography } from "@mui/material";
//import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Addproject = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [document, setDocument] = useState();
  const [links, setLinks] = useState();
  const [deadline, setDeadline] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const name = cookies.itemName;
  const itemID = cookies.itemID;
  const userID = cookies.userID;
  const team = cookies.teamID;
  const token = cookies.Token;
  const itemEmail = cookies.itemEmail;

  const config = { headers: { "Content-type": "application/json" } };

  const data = {
    itemID: itemID,
    userID: userID,
    title: title,
    description: description,
    document: document,
    links: links,
    deadline: deadline,
    team: team,
    itemEmail: itemEmail,
  };

  const submit = async () => {
    if (!title || !description || !deadline) {
      toast.warning("Title, description and deadline required", {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 2000, // Set the autoClose time in milliseconds
        hideProgressBar: true, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          `${APIURL}/api/project/add`,
          data,
          config
        );
        console.log(response);
        navigate("/projects");
      } catch (error) {
        console.log(error);
      }
    }
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
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    //label="Document"
                    variant="outlined"
                    type="file"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setDocument(e.target.value)}
                  />
                  <TextField
                    label="Link(s)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setLinks(e.target.value)}
                  />

                  <TextField
                    type="datetime-local"
                    //label="Link(s)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setDeadline(e.target.value)}
                  />

                  <Button variant="outlined" color="primary" onClick={submit}>
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>

                  <ToastContainer className="m-3" />
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
