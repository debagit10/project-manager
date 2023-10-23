import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateTeam from "../team/CreateTeam";
import JoinTeam from "../team/JoinTeam";
import ViewTeams from "../components/ViewTeams";
import History from "./History";
import Team from "./Team";
import Addproject from "../modal/Addproject";
import Project from "./Project";
import Report from "./Report";
import ViewReport from "./ViewReport";
import ViewProjects from "../components/ViewProjects";

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

import { Cookies } from "react-cookie";
import Container from "../components/Container.tsx";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import create from "../images/create.jpg";
import join from "../images/join.jpg";
import project from "../images/project.jpg";

const Home = ({ children }) => {
  return (
    <Container>
      <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-screen">
        <div className="container">
          <h1>Good afternoon, user</h1>
          <div
            style={{ marginTop: "50px" }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-5 "
          >
            <div className="">
              <Paper elevation={4}>
                <img src={create} className="rounded-md" />
                <div style={{ fontWeight: "bolder" }}>Create a team:</div> you
                have a team and want to manage their projects, you're just few
                steps from setting up after clicking this:
                <br />
                <Button>Create team</Button>
              </Paper>
            </div>
            <div className="">
              <Paper elevation={4}>
                <img src={join} />
                <div style={{ fontWeight: "bolder" }}>Join a team:</div>
                Joining a team has never been easier. By just inputting the ID
                given to you, you're already a member of that team <br />
                <Button>Join team</Button>
              </Paper>
            </div>
            <div className="">
              <Paper elevation={4}>
                <img src={project} />
                <div style={{ fontWeight: "bolder" }}>Analytics:</div>
                Want to access your weekly performances, here gives you detailed
                analysis of what you need to know. <br />
                <Button>View</Button>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Home;
