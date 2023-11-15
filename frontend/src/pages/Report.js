import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Container.tsx";
import { APIURL } from "../env";
import { Button, Paper } from "@mui/material";

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
  const itemEmail = cookies.itemEmail;
  const userEmail = cookies.Email;
  const assigned_to_email = cookies.assigned_to_email;

  const config = { headers: { "Content-type": "application/json" } };

  const data = {
    title: title,
    project_id: project_id,
    assigned_by: assigned_by,
    deadline: deadline,
    userID: userID,
    summary: summary,
    report: report,
    itemEmail: itemEmail,
    userEmail: userEmail,
    team: team,
  };

  const submit = async () => {
    const response = await axios.post(`${APIURL}/api/report/add`, data, config);
  };

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
          <div className="container">
            <Paper elevation={4}>
              <div className="container">
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
                <Button onClick={submit} variant="outlined">
                  Submit report
                </Button>
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

export default Report;
