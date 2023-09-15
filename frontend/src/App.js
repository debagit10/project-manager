import React from "react";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Authentication} />
        <Route path="/home" Component={Home} />
      </Routes>
    </div>
  );
};

export default App;
