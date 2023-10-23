import React, { useState } from "react";
import Home from "../pages/Home";
import Header from "./Header.tsx";
import Navbar from "./Navbar.tsx";
//import Sidebar from "./Sidebar.tsx";

const Container = ({ children }) => {
  const [home, setHome] = useState(true);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div style={{ marginTop: "60px" }} className="">
        {children}
      </div>
    </div>
  );
};

export default Container;
