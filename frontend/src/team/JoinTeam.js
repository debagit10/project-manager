import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const JoinTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [teamID, setTeamID] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const userID = cookies.userID;

  const submit = async () => {
    if (!teamID) {
      setError("Please insert team's ID");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/joinTeam",
        { userID, teamID },
        config
      );
      const join = response.data;
      console.log(response.data);
      if (join.error) {
        setError(join.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
        Join team
      </button>
      {isOpen && (
        <div className="block">
          <label>Team's ID</label>
          <input type="text" />
          <button className="btn btn-primary">Join</button>
        </div>
      )}
    </div>
  );
};

export default JoinTeam;
