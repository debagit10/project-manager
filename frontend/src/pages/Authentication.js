import React, { useState } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logo1 from "../logo/Logo1.png";
import Logo2 from "../logo/Logo2.png";
import Logo3 from "../logo/Logo3.png";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="text-center bg-Bgg bg-cover bg-no-repeat h-screen sm:h-auto">
      <Login />
    </div>
  );
};

export default Authentication;
