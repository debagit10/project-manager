import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Container from "./Container.tsx";

const ViewProjects = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const getProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getProject",
        {
          userID,
        },
        config
      );

      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getProject();
    }
  }, []);

  return (
    <Container>
      <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
        <div className="container">
          <Typography>Your projects, {username}</Typography>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Assgined by</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            {projects.map((project) => (
              <tbody>
                <tr
                  key={project.project_id}
                  onClick={() => {
                    navigate("/view_project");
                    setCookie("projectID", project.project_id);
                    setCookie("project_title", project.title);
                    setCookie("assignedBy", project.name);
                    setCookie("team", project.team_name);
                    setCookie("desc", project.description);
                    setCookie("link", project.link);
                    setCookie("document", project.document);
                    setCookie("date_given", project.date_given);
                    setCookie("deadline", project.deadline);
                    setCookie("givenby", project.assigned_by);
                    setCookie("givento", project.assigned_to);
                  }}
                >
                  <td>{project.title}</td>
                  <td>{project.name}</td>
                  <td>{project.team_name}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ViewProjects;
