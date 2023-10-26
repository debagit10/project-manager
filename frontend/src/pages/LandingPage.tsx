import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo2 from "../logo/Logo2.png";
import Logo3 from "../logo/Logo3.png";
import Logo1 from "../logo/Logo1.png";
import image8 from "../images/image8.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-Bgg bg-cover bg-no-repeat h-screen sm:[90rem]">
      <div className="container ">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"

          // height="100vh"
        >
          <div>
            <img src={Logo2} alt="Nithub logo" className="w-72" />
          </div>

          <div>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              className="italic"
            >
              project management platform.
            </Typography>
          </div>
          <div
            className="italic pt-5"
            style={{ lineHeight: "20px", fontWeight: "bold" }}
          >
            Are you ready to take control of your projects, streamline your
            <br />
            workflow, and empower your team to deliver exceptional results?
            <br /> Look no further, the all-in-one project management platform
            that's
            <br />
            designed to transform the way you manage projects, from inception to
            <br />
            completion.
          </div>
          <div>
            <Button
              onClick={() => navigate("/signup")}
              variant="outlined"
              className="mt-5"
              size="large"
              color="success"
            >
              Get started
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default LandingPage;
