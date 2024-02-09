import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container.tsx";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { APIURL } from "../env";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const ViewReport = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [report, setReport] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const navigate = useNavigate();

  const title = cookies.project_title;
  const projectID = cookies.projectID;
  const assigned_by = cookies.assignedBy;
  const team = cookies.team;
  const desc = cookies.desc;
  const link = cookies.link;
  const document = cookies.document;
  const date_given = cookies.date_given;
  const deadline = cookies.deadline;
  const givenby = cookies.givenby;
  const givento = cookies.givento;
  const userID = cookies.userID;
  const username = cookies.Name;
  const token = cookies.Token;
  const assigned_to_email = cookies.assigned_to_email;

  const config = { headers: { "Content-type": "application/json" } };

  const viewReport = async () => {
    const data = {
      projectID: projectID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/report/get`, {
        params: data,
        headers: config.headers,
      });
      setReport(response.data);

      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    if (!comment) {
      toast.warning("Add a comment please", {
        position: toast.POSITION.TOP_CENTER, // Set the position
        autoClose: 2000, // Set the autoClose time in milliseconds
        hideProgressBar: true, // Set to true to hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the autoClose timer when hovering
        draggable: true, // Allow the toast to be dragged
      });
    }
    const data = {
      comment: comment,
      projectID: projectID,
    };
    setLoading1(true);
    try {
      const response = await axios.post(
        `${APIURL}/api/comment/add`,
        data,
        config
      );
      setTimeout(() => {
        setLoading1(false);
        toast.success("Comment added", {
          position: toast.POSITION.TOP_CENTER, // Set the position
          autoClose: 2000, // Set the autoClose time in milliseconds
          hideProgressBar: true, // Set to true to hide the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the autoClose timer when hovering
          draggable: true, // Allow the toast to be dragged
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async () => {
    const data = {
      projectID: projectID,
      title: title,
      team: team,
      assigned_to_email: assigned_to_email,
    };
    setLoading(true);
    try {
      const response = await axios.put(
        `${APIURL}/api/comment/validate`,
        data,
        config
      );
      setTimeout(() => {
        setLoading(false);
        toast.success("Report successfully validated", {
          position: toast.POSITION.TOP_CENTER, // Set the position
          autoClose: 2000, // Set the autoClose time in milliseconds
          hideProgressBar: true, // Set to true to hide the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the autoClose timer when hovering
          draggable: true, // Allow the toast to be dragged
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewReport();
  });

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          {report.map((item) => (
            <div className="container">
              <Paper elevation={4}>
                <div className="container">
                  <Typography variant="h5">Report for: {item.title}</Typography>
                  <Typography variant="subtitle2">
                    Submitted on: {item.submitted_on}
                  </Typography>
                  <br />
                  <div>
                    <Typography variant="body1">Dear {assigned_by},</Typography>
                    <br />
                    <Typography variant="body1">
                      Summary: {item.summary}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      View here: {item.report}
                    </Typography>
                    <br />
                    <div class="mb-3">
                      <TextField
                        name="Comment"
                        placeholder="Validate or ask to re-do"
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <br />
                      <br />
                      <Button variant="outlined" onClick={submit}>
                        {loading1 ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Add comment"
                        )}
                      </Button>
                      <br />
                      <br />
                      <Typography>
                        Are you satisfied with the report? if yes, click <br />
                        <br />
                        <Button variant="outlined" onClick={validate}>
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            "Validate report"
                          )}
                        </Button>
                      </Typography>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </Paper>
            </div>
          ))}
        </div>
      ) : (
        navigate("/")
      )}
    </Container>
  );
};

export default ViewReport;
