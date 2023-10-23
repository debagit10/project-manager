import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-type": "application/json" } };

    if (!email || !password) {
      setError("Please fill all fields");
    } else {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        config
      );
      const user = response.data;
      console.log(response.data);
      if (user.error) {
        setError(user.error);
      } else {
        setCookie("Email", user.email);
        setCookie("Token", user.token);
        setCookie("userID", user.userID);
        setCookie("Name", user.name);
        navigate("/home");
      }
      //console.log(email, password);
    }
  };

  return (
    <div className="mx-5 flex justify-center">
      <div className=" w-96 border rounded-lg mt-10">
        <h2 className="flex justify-center">Login:</h2>
        <div className="p-5 flex flex-col">
          <label>Email:</label>
          <input
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-5 flex flex-col">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="p-5 flex flex-col">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
        <div className="pl-5 py-3 flex flex-col">{error}</div>
      </div>
    </div>
  );
};

export default Login;
