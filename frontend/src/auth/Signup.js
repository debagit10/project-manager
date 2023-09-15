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
    } else {
      if (password != confirmPassword) {
        setError("Passwords do not match");
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
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError("Sign up successful");
        setCookie("Email", user.email);
        setCookie("Token", user.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container mt-5">
      <div class="">
        <div class="col-md-6">
          <h2>Sign Up</h2>
          <form>
            <div class="mb-3">
              <label for="signupEmail" class="form-label">
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
              <label for="signupEmail" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="signupPassword" class="form-label">
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
            <div class="mb-3">
              <label for="signupPassword" class="form-label">
                Confirm password
              </label>
              <input
                type="password"
                class="form-control"
                id="confirm_password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button class="btn btn-primary" onClick={submit}>
              Sign Up
            </button>
            <div className="mb-3">{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
