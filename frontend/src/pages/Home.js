import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateTeam from "../team/CreateTeam";
import JoinTeam from "../team/JoinTeam";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "../components/Navbar.tsx";

import Container from "../components/Container.tsx";
import create from "../images/create.jpg";
import join from "../images/join.jpg";
import join2 from "../images/join2.jpg";
import project from "../images/project.jpg";

const Home = ({ children }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();
  const username = cookies.Name;
  const token = cookies.Token;
  return (
    <Container>
      {token ? (
        <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
          <div className="container">
            <h1>Welcome, {username}</h1>
            <div
              style={{ marginTop: "50px" }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-5"
            >
              <div className="">
                <Paper elevation={4}>
                  <img src={create} className="rounded-lg" />

                  <Typography variant="body1" className="p-2">
                    You have a team and want to manage their projects, you're
                    just few steps from setting up after clicking this:
                  </Typography>

                  <br />

                  <CreateTeam />
                </Paper>
              </div>
              <div className="">
                <Paper elevation={4}>
                  <img
                    src={join2}
                    style={{ width: "100%", height: "325px" }}
                    className="rounded-lg"
                  />
                  <Typography variant="body1" className="p-2">
                    Joining a team has never been easier. By just inputting the
                    ID given to you, you're already a member of that team
                  </Typography>{" "}
                  <br />
                  <JoinTeam />
                </Paper>
              </div>
              <div>
                <Paper elevation={4}>
                  <img src={project} className="rounded-lg" />

                  <Typography variant="body1" className="p-2">
                    Work on projects you have been assigned to or review
                    projects you assigned. Finish your projects before the given
                    deadline to keep your performance percentage up.
                  </Typography>

                  <Button
                    variant="outlined"
                    className="mb-2"
                    onClick={() => navigate("/projects")}
                  >
                    View
                  </Button>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </Container>
  );
};
export default Home;
