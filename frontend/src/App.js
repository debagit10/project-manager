import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import { LocalizationProvider } from "@mui/x-date-pickers";
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Addproject from "./pages/AddProject";
import Authentication from "./pages/Authentication";
import History from "./pages/History";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Report from "./pages/Report";
import Team from "./pages/Team";
import ViewReport from "./pages/ViewReport";
import LandingPage from "./pages/LandingPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ViewProjects from "./components/ViewProjects";
import ViewTeams from "./components/ViewTeams";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Password from "./pages/Password";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/auth" Component={Authentication} />
        <Route path="/home" Component={Home} />
        <Route path="/view_team" Component={Team} />
        <Route path="/add_Project" Component={Addproject} />
        <Route path="/view_project" Component={Project} />
        <Route path="/report" Component={Report} />
        <Route path="/view_report" Component={ViewReport} />
        <Route path="/history" Component={History} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/projects" Component={ViewProjects} />
        <Route path="/teams" Component={ViewTeams} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/forgotPassword" Component={Password} />
      </Routes>
    </div>
  );
};

export default App;
