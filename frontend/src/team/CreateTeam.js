import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const CreateTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [error, setError] = useState();

  const userID = cookies.userID;
  const username = cookies.Name;

  const submit = async () => {
    if (!name || !about) {
      setError("Please fill out all fields");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/createTeam",
        {
          name,
          about,
          userID,
          username,
        },
        config
      );
      const team = response.data;
      //console.log(team);
      if (team.error) {
        setError(team.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createTeam"
        >
          Create new team
        </button>

        <div
          class="modal fade"
          id="createTeam"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Create new team
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="col-md-6">
                  <form>
                    <div class="mb-3">
                      <label for="email" class="form-label">
                        Team name
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="mb-3">
                      <label for="about" class="form-label">
                        About
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="about"
                        placeholder="A short description about the team"
                        required
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">{error}</div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick={submit}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
