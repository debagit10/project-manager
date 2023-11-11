import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Container.tsx";

const Report = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const [summary, setSummary] = useState();
  const [report, setReport] = useState();

  const title = cookies.project_title;
  const project_id = cookies.projectID;
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

  const submit = async () => {
    const response = await axios.post(
      "http://localhost:5000/projectReport",
      {
        title,
        project_id,
        assigned_by,
        deadline,
        userID,
        summary,
        report,
      },
      config
    );
  };

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
          <h5>Give your report for this project:</h5>
          <div class="mb-3">
            <label class="form-label">Project title</label>
            <input type="text" class="form-control" value={title} />
          </div>
          <div class="mb-3">
            <label class="form-label">Date given</label>
            <input type="text" class="form-control" value={date_given} />
          </div>
          <div class="mb-3">
            <label class="form-label">Deadline</label>
            <input type="text" class="form-control" value={deadline} />
          </div>
          <div class="mb-3">
            <label class="form-label">Document or link</label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setReport(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <textarea
              class="form-control"
              rows="3"
              placeholder="A short summary on the completion of this project"
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
          </div>
          <button onClick={submit} className="btn">
            Submit report
          </button>
        </div>
      ) : (
        navigate("/login")
      )}
    </Container>
  );
};

export default Report;
