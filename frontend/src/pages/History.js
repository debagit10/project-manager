import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const History = () => {
  const [cookies, setCookie, removeCookies] = useCookies();

  const userID = cookies.userID;

  const [history, setHistory] = useState([]);

  const config = { headers: { "Content-type": "application/json" } };

  const getHistory = async () => {
    const response = await axios.post(
      "http://localhost:5000/getProject",
      {
        userID,
      },
      config
    );
    setHistory(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getHistory();
  });

  return (
    <div className="container">
      This is a list of all the projects you have worked on:
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">By</th>
            <th scope="col">Team</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {history.map((item) => (
          <tbody>
            <tr>
              <td>{item.title}</td>
              <td>{item.assigned_by == userID ? "You" : item.name}</td>
              <td>{item.team_name}</td>
              <td>{item.done == "true" ? "Done" : "Pending"}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default History;
