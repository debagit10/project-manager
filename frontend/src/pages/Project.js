import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Container from "../components/Container.tsx";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";

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
    const data = {
      projectID: projectID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/comment/view`, {
        params: data,
        headers: config.headers,
      });
      setFeedback(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a new Date object using the timestamp
  const date = new Date(date_given);

  // Extract individual components of the date and time
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the components to dd/mm/yyyy and hh:mm:ss
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

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
                  <Typography variant="body1">{formattedDate}</Typography>
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
        navigate("/")
      )}
    </Container>
  );
};

export default Project;
