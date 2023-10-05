import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword || !email) {
      setError("Please fill all fields");
      return;
    } else {
      if (password != confirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        console.log(email, name, password);
      }
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          name,
          password,
        },
        config
      );
      const user = response.data;
      console.log(response.data);
      if (user.error) {
        setError(user.error);
        return;
      } else {
        setError("Sign up successful");
        setCookie("Email", user.email);
        setCookie("Token", user.token);
        setCookie("userID", user.id);
        setCookie("Name", user.name);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-5 flex  justify-center">
      <div className=" w-96 border border-slate-100 rounded-lg mt-10">
        <h2 className="flex justify-center ">Sign up:</h2>
        <div className="py-3 px-3 flex flex-col">
          <label>Email:</label>
          <input
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="py-3 px-3 flex flex-col">
          <label>Username:</label>
          <input placeholder="" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="py-3 px-3 flex flex-col">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="py-3 px-3 flex flex-col">
          <label>Confirm password:</label>
          <input
            type="password"
            placeholder="Confirm the password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="py-3 px-3 flex flex-col">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
        <div className="pl-5 py-3 flex flex-col">{error}</div>
      </div>
    </div>
  );
};

export default Signup;
