import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";
import { Paper, Typography, TextField, Button } from "@mui/material";

const ViewReport = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [report, setReport] = useState([]);
  const [comment, setComment] = useState([]);

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

  const config = { headers: { "Content-type": "application/json" } };

  const viewReport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getReport",
        {
          projectID,
        },
        config
      );
      setReport(response.data);

      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/comment",
        {
          projectID,
          comment,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/validate",
        { projectID },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewReport();
  });

  return (
    <Container>
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
                      Send comment
                    </Button>
                    <br />
                    <br />
                    <Typography>
                      Are you satisfied with the report, if yes, click <br />
                      <br />
                      <Button variant="outlined" onClick={validate}>
                        Validate report
                      </Button>
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ViewReport;
