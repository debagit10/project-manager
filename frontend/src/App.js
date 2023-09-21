import React from "react";
import { Route, Routes } from "react-router-dom";
import Addproject from "./modal/Addproject";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Team from "./pages/Team";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Authentication} />
        <Route path="/home" Component={Home} />
        <Route path="/team" Component={Team} />
        <Route path="/addProject" Component={Addproject} />
        <Route path="/viewproject" Component={Project} />
      </Routes>
    </div>
  );
};

export default App;
