import React, { useEffect, useState } from "react";
import CreateTeam from "../team/CreateTeam";
import JoinTeam from "../team/JoinTeam";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Project from "./Project";

const Home = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const getTeams = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getTeams",
        {
          userID,
        },
        config
      );
      const teams = response.data;
      setTeams(teams);
      //console.log(teams);
      if (teams.error) {
        setError(teams.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getProject",
        {
          userID,
        },
        config
      );
      // console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getTeams();
      getProject();
    } else {
      navigate("/");
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Your teams, {username}:</h4>
        </div>

        <div className="d-flex justify-content-evenly col">
          <JoinTeam />
          <CreateTeam />
        </div>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Admin</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        {teams.map((team) => (
          <tbody
            className="container"
            onClick={() => {
              setCookie("teamID", team.team_id);
              setCookie("team_name", team.team_name);
              setCookie("about", team.about);
              setCookie("admin", team.admin);
              setCookie("adminID", team.admin_id);
              navigate("/team");
            }}
          >
            <tr key={team.team_id} team={team}>
              <td>{team.team_name}</td>
              <td>{team.admin_id == userID ? "You" : team.admin}</td>
              <td>{team.about}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <h4>Pending projects:</h4>
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Assigned by</th>
              <th scope="col">Team</th>
            </tr>
          </thead>
          {projects.map(
            (project) =>
              project.done != "true" && (
                <tbody
                  className="container"
                  onClick={() => {
                    navigate("/viewProject");
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
                  <tr key={project.project_id}>
                    <td>{project.title}</td>
                    <td>{project.name}</td>
                    <td>{project.team_name}</td>
                  </tr>
                </tbody>
              )
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
