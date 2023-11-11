import React, { useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//import Project from "./Project";
import Container from "./Container.tsx";
import { Typography, Paper } from "@mui/material";

const ViewTeams = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [teams, setTeams] = useState([]);

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
      const team = response.data;
      setTeams(team);
      console.log(teams);
      if (team.error) {
        setError(team.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeams();
  });

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          <div className="container">
            <Typography variant="h4">
              Teams you belong to, {username}
            </Typography>
            <Paper elevation={4}>
              {teams.length > 0 ? (
                <div className="">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Owner</th>
                        <th scope="col">About</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr
                          key={team.team_id}
                          onClick={() => {
                            navigate("/view_team");
                            setCookie("teamID", team.team_id);
                            setCookie("team_name", team.team_name);
                            setCookie("about", team.about);
                            setCookie("admin", team.admin);
                            setCookie("adminID", team.admin_id);
                            setCookie("teamCode", team.team_code);
                          }}
                        >
                          <td>{team.team_name}</td>
                          <td>
                            {team.admin_id == userID ? "You" : team.admin}
                          </td>
                          <td>{team.about}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                "You do not belong to any team. Join or create a team to work with others."
              )}
            </Paper>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </Container>
  );
};

export default ViewTeams;
