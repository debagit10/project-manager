import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
        navigate("/home");
      }
      //console.log(email, password);
    }
  };

  return (
    <div class="container mt-5">
      <div class="">
        <div class="col-md-6">
          <h2>Log in</h2>
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button class="btn btn-primary" onClick={submit}>
              Login
            </button>
            <div className="mb-3">{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
