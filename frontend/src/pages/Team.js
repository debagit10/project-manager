import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Options from "../modal/Options";

const Team = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [detail, setDetail] = useState([]);
  const [viewAdmin, setViewAdmin] = useState([]);
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

  useEffect(() => {
    view();
    getAdmin();
  });

  return (
    <div className="container">
      <h3>Team name: {name}</h3>
      <p>About: {about}</p>
      <h6>Owner : {userID == adminID ? "You" : admin}</h6>
      <h6>Admins: {viewAdmin.map((item) => `${item.name} `)}</h6>
      <p>
        Members:
        {detail.map((item) => (
          <ul>
            <li>
              <Options item={item} />
            </li>
          </ul>
        ))}
      </p>
    </div>
  );
};

export default Team;
