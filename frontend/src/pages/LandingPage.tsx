import { Button } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
      Welcome!!!!
      <Button onClick={() => navigate("/signup")}>Get started</Button>
    </div>
  );
};

export default LandingPage;
