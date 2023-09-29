import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Options from "../modal/Options";

const Team = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [detail, setDetail] = useState([]);
  const [viewAdmin, setViewAdmin] = useState([]);
  const [projects, setProjects] = useState([]);
  const teamID = cookies.teamID;
  const username = cookies.Name;
  const userID = cookies.userID;
  const name = cookies.team_name;
  const about = cookies.about;
  const admin = cookies.admin;
  const adminID = cookies.adminID;

  const config = { headers: { "Content-type": "application/json" } };

  const view = async () => {
    const response = await axios.post(
      "http://localhost:5000/viewTeam",
      { teamID },
      config
    );
    setDetail(response.data);

    //console.log(response.data);
  };

  const getAdmin = async () => {
    const response = await axios.post(
      "http://localhost:5000/getAdmin",
      {
        teamID,
      },
      config
    );
    //console.log(response.data);
    setViewAdmin(response.data);
  };

  const teamProjects = async () => {
    const response = await axios.post(
      "http://localhost:5000/teamProject",
      { teamID },
      config
    );
    //console.log(response.data);
    setProjects(response.data);
  };

  const leaveTeam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leaveTeam",
        { userID, teamID },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/deleteTeam",
        { teamID },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    view();
    //getAdmin();
    teamProjects();
  });

  return (
    <div className="container">
      <h3>Team name: {name}</h3>
      <p>About: {about}</p>
      <h6>Created by: {userID == adminID ? "You" : admin}</h6>
      <p>
        Members:
        {detail.map((item) => (
          <p onClick={() => console.log(item.min_admin)}>
            {adminID == userID ||
            (item.id != userID && item.min_admin == true) ? (
              <Options item={item} />
            ) : item.id == adminID || item.min_admin == true ? (
              `${item.name} (admin)`
            ) : (
              `${item.name}`
            )}
          </p>
        ))}
      </p>

      <div>
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

      {adminID == userID && (
        <p>Use this ID: {teamID} to give user accesss to join this team</p>
      )}
      <div>
        {adminID == userID ? (
          <button className="btn" onClick={deleteTeam}>
            Delete team
          </button>
        ) : (
          <button className="btn" onClick={leaveTeam}>
            Leave team
          </button>
        )}
      </div>
    </div>
  );
};

export default Team;
