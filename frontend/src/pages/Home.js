import React, { useEffect, useState } from "react";
import CreateTeam from "../team/CreateTeam";
import JoinTeam from "../team/JoinTeam";
import axios from "axios";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [teams, setTeams] = useState([]);

  const userID = cookies.userID;
  const username = cookies.Name;

  const getTeams = async () => {
    const config = { headers: { "Content-type": "application/json" } };

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

  useEffect(() => {
    getTeams();
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Your teams, {username}:</h2>
        </div>

        <div className="d-flex justify-content-evenly col">
          <JoinTeam />
          <CreateTeam />
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team name</th>
            <th scope="col">Team Admin</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        {error ||
          teams.map((team) => (
            <tbody>
              <tr>
                <th scope="row">{team.index}</th>
                <td>{team.team_name}</td>
                <td>{team.admin_id == userID ? "You" : team.admin}</td>
                <td>{team.about}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Home;
