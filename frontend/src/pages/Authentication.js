import React, { useState } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logo1 from "../logo/Logo1.png";
import Logo2 from "../logo/Logo2.png";
import Logo3 from "../logo/Logo3.png";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-slate-300 h-screen ">
      <div className="container pt-3 flex flex-col justify-center pb-5">
        <div className="flex flex-col">
          <div className="flex justify-center mx-5">
            <div className="flex flex-col ">
              <img src={Logo2} alt="Nithub logo" className="w-56" />
              <p className="italic">project managment platform.</p>
            </div>
          </div>
          {isLogin ? <Login /> : <Signup />}
          <div className="m-3 flex justify-center">
            <button
              className="btn border text-black m-5"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className="btn border text-black m-5"
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
