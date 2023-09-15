import React, { useState } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="container ">
      {isLogin ? <Login /> : <Signup />}
      <div className="m-3">
        <button className="btn" onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className="btn " onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Authentication;
