import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const JoinTeam = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [teamID, setTeamID] = useState();
  const [error, setError] = useState();
  const userID = cookies.userID;

  const submit = async () => {
    if (!teamID) {
      setError("Please insert team's ID");
    }

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        "http://localhost:5000/joinTeam",
        { userID, teamID },
        config
      );
      const join = response.data;
      console.log(response.data);
      if (join.error) {
        setError(join.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#joinTeam"
      >
        Join team
      </button>

      <div
        class="modal fade"
        id="joinTeam"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Join team
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
                      Team's ID
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      required
                      onChange={(e) => setTeamID(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">{error}</div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={submit}>
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
