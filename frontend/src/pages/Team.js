import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Options from "../modal/Options";
import Container from "../components/Container.tsx";
import { Button, formGroupClasses, Paper, Typography } from "@mui/material";
import { APIURL } from "../env";

const Team = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [detail, setDetail] = useState([]);
  const [viewAdmin, setViewAdmin] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);

  const navigate = useNavigate();

  const teamID = cookies.teamID;
  const username = cookies.Name;
  const userID = cookies.userID;
  const name = cookies.team_name;
  const about = cookies.about;
  const admin = cookies.admin;
  const adminID = cookies.adminID;
  const teamCode = cookies.teamCode;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const view = async () => {
    const data = {
      teamID: teamID,
    };

    try {
      const response = await axios.get(`${APIURL}/api/team/view`, {
        params: data,
      });
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const teamProjects = async () => {
    const data = {
      teamID: teamID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/team/projects`, {
        params: data,
      });

      setProjects(response.data);
      console.log(projects);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveTeam = async () => {
    const data = { userID: userID, teamID: teamID };

    try {
      const response = await axios.delete(`${APIURL}/api/team/leave`, {
        params: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeam = async () => {
    const data = {
      teamID: teamID,
    };
    try {
      const response = await axios.delete(`${APIURL}/api/team/delete`, {
        params: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const min_admin = async () => {
    const data = {
      teamID: teamID,
      userID: userID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/team/admin`, {
        params: data,
      });

      setIsAdmin(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    view();
    teamProjects();
    min_admin();
  });

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          <div className="container">
            <Paper elevation={4}>
              <div className="container">
                <Typography variant="h5">Team name: {name}</Typography>
                <Typography variant="h6">
                  <b>Created by:</b> {userID == adminID ? "You" : admin}
                </Typography>
                <Typography variant="body1">
                  <b>About:</b> {about}
                </Typography>

                <div className="m-2">
                  <p style={{ fontWeight: "bolder" }}>Members:</p>
                  {detail.map((item) => (
                    <Typography>
                      {isAdmin.min_admin == true && item.id == userID ? (
                        "You (admin)"
                      ) : item.id == userID ? (
                        "You"
                      ) : item.id == adminID ||
                        (item.min_admin == true && userID != adminID) ? (
                        `${item.name} (admin)`
                      ) : userID == adminID ? (
                        <Options item={item} />
                      ) : isAdmin.min_admin == true ? (
                        <Options item={item} />
                      ) : (
                        `${item.name}`
                      )}
                    </Typography>
                  ))}
                </div>

                {projects.length > 0 ? (
                  <div className="container">
                    <div className="m-3">
                      <h6>Outstanding Projects:</h6>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Assigned to</th>
                          </tr>
                        </thead>
                        {projects.map(
                          (project) =>
                            project.done != "true" && (
                              <tbody>
                                <tr>
                                  <td>{project.title}</td>
                                  <td>{project.name}</td>
                                </tr>
                              </tbody>
                            )
                        )}
                      </table>
                    </div>
                  </div>
                ) : (
                  <Typography variant="body1">
                    There are no outstanding projects.
                  </Typography>
                )}

                {adminID == userID && <p>Team's code: {teamCode}</p>}
                {isAdmin.min_admin == true && <p>Team's code: {teamCode}</p>}
                <div className="m-3">
                  {adminID == userID ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        deleteTeam();
                        navigate("/teams");
                      }}
                    >
                      Delete team
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        leaveTeam();
                        navigate("/teams");
                      }}
                    >
                      Leave team
                    </Button>
                  )}
                </div>
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

export default Team;
