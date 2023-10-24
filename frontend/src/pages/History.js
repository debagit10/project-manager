import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";
import { useNavigate } from "react-router-dom";

const History = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [history, setHistory] = useState([]);

  const userID = cookies.userID;
  const token = cookies.Token;

  const navigate = useNavigate();

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
  }, []);

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
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
      ) : (
        navigate("/auth")
      )}
    </Container>
  );
};

export default History;
