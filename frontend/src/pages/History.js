import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Container from "../components/Container.tsx";
import { useNavigate } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { APIURL } from "../env";

const History = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [history, setHistory] = useState([]);

  const userID = cookies.userID;
  const token = cookies.Token;

  const navigate = useNavigate();

  const config = { headers: { "Content-type": "application/json" } };

  const getHistory = async () => {
    const data = {
      userID: userID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/project/get`, {
        params: data,
      });
      setHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
          <div className="container">
            <Typography variant="h4" className="mb-3">
              This is a list of all the projects you have worked on:
            </Typography>
            <div className="container">
              <Paper elevation={4}>
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
                        <td>
                          {item.assigned_by == userID ? "You" : item.name}
                        </td>
                        <td>{item.team_name}</td>
                        <td>{item.done == "true" ? "Done" : "Pending"}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Paper>
            </div>
          </div>
        </div>
      ) : (
        navigate("/auth")
      )}
    </Container>
  );
};

export default History;
