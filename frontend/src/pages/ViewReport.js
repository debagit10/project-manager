import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";

const ViewReport = () => {
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

  const viewReport = async ({ children }) => {
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
      <div className="container">
        {report.map((item) => (
          <div>
            <h1>{item.title}</h1>
            <p>Summary: {item.summary}</p>
            <p>Submitted on: {item.submitted_on}</p>
            <p>Report: {item.report}</p>
            <div class="mb-3">
              <textarea
                class="form-control"
                placeholder="Validate or ask to re-do project with specific instructions"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="btn" onClick={submit}>
                Send comment
              </button>
              <button className="btn" onClick={validate}>
                Validate report
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ViewReport;
