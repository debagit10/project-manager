import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Container from "../components/Container.tsx";

const Project = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [feedBack, setFeedback] = useState([]);

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
      <div className="container">
        This project was given in {team} by{" "}
        {userID == givenby ? "You" : assigned_by} on {date_given}.<br />
        About project:
        <br /> Title: {title} <br />
        {desc}
        <br />
        The following documents or link can be access :{document} {link}.<br />
        {userID != givenby &&
          `Make sure to finish project and report to ${assigned_by} on or before
      ${deadline}`}{" "}
        <br />
        <br />
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
          <a href="/view_report" className="btn">
            View report
          </a>
        ) : (
          <a href="/report" className="btn">
            Give report
          </a>
        )}
      </div>
    </Container>
  );
};

export default Project;
