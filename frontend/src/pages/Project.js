import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Container from "../components/Container.tsx";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Project = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [feedBack, setFeedback] = useState([]);

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

  const config = { headers: { "Content-type": "application/json" } };

  const viewComment = async () => {
    const response = await axios.post(
      "http://localhost:5000/viewComment",
      {
        projectID,
      },
      config
    );
    setFeedback(response.data);
  };

  useEffect(() => {
    viewComment();
  });

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          <div className="container">
            <Paper elevation={4}>
              <div className="container">
                <Typography variant="h4">Title: {title}</Typography>

                <br />
                <Typography variant="h6">
                  Assigned by:{" "}
                  <Typography variant="body1">
                    {userID == givenby ? "You" : assigned_by}
                  </Typography>
                </Typography>

                <br />
                <Typography variant="h6">
                  Team: <Typography variant="body1">{team}</Typography>
                </Typography>

                <br />
                <Typography variant="h6">
                  Assigned on:{" "}
                  <Typography variant="body1">{date_given}</Typography>
                </Typography>

                <br />
                <Typography variant="h6">
                  About project: <Typography variant="body1">{desc}</Typography>
                </Typography>

                <br />
                <Typography variant="h6">
                  Document/Link: {document} {link}
                </Typography>

                <Typography variant="body1" className="m-3">
                  {userID == givenby && `Deadline: ${deadline}`}
                </Typography>

                <Typography variant="body1" className="m-3">
                  {" "}
                  {userID != givenby &&
                    `Make sure to finish project and report to ${assigned_by} on or before
      ${deadline}`}
                </Typography>

                {userID != givenby && (
                  <div>
                    <h6>Feedback: </h6>
                    {feedBack.map((comment) => (
                      <p>{comment.comment}</p>
                    ))}
                  </div>
                )}

                <br />
                {givenby == userID ? (
                  <Button
                    onClick={() => navigate("/view_report")}
                    variant="outlined"
                    color="primary"
                    className="m-3"
                  >
                    View Report
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/report")}
                    variant="outlined"
                    color="primary"
                    className="m-3"
                  >
                    Give report
                  </Button>
                )}
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

export default Project;
