import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const CreateTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const userID = cookies.userID;
  const username = cookies.Name;

  const submit = async () => {
    if (!name || !about) {
      setError("Please fill out all fields");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/createTeam",
        {
          name,
          about,
          userID,
          username,
        },
        config
      );
      const team = response.data;
      //console.log(team);
      if (team.error) {
        setError(team.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
        CreateTeam
      </button>
      {isOpen && (
        <div className="block z-0">
          <label>Team's Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <label>About:</label>
          <input
            type="text"
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Short description about the team"
          />
          <button className="btn btn-primary">Create</button>
        </div>
      )}
    </div>
  );
};

export default CreateTeam;
