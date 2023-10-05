import React from "react";
import { Route, Routes } from "react-router-dom";
import Addproject from "./modal/Addproject";
import Sidebar from "./modal/Sidebar";
import Authentication from "./pages/Authentication";
import History from "./pages/History";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Report from "./pages/Report";
import Team from "./pages/Team";
import ViewReport from "./pages/ViewReport";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Authentication} />
        <Route path="/home" Component={Home} />
        <Route path="/team" Component={Team} />
        <Route path="/addProject" Component={Addproject} />
        <Route path="/viewproject" Component={Project} />
        <Route path="/report" Component={Report} />
        <Route path="/view_report" Component={ViewReport} />
        <Route path="/history" Component={History} />
        <Route path="/sidebar" Component={Sidebar} />
      </Routes>
    </div>
  );
};

export default App;
