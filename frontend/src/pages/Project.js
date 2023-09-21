import React from "react";
import { useCookies } from "react-cookie";

const Project = () => {
  const [cookies, setCookie, removeCookies] = useCookies();

  const title = cookies.project_title;
  const id = cookies.projectID;
  const assigned_by = cookies.assignedBy;
  const team = cookies.team;
  const desc = cookies.desc;
  const link = cookies.link;
  const document = cookies.document;
  const date_given = cookies.date_given;
  const deadline = cookies.deadline;

  return (
    <div className="container">
      This project was given in {team} by {assigned_by} on {date_given}.<br />
      About project:
      <br /> Title: {title} <br />
      {desc}
      <br />
      The following documents or link can be access :{document} {link}.<br />
      Make sure to finish project and report to {assigned_by} on or before{" "}
      {deadline}
    </div>
  );
};

export default Project;
