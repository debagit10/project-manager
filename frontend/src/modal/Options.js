import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Addproject from "./Addproject";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Options = ({ item }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const teamID = cookies.teamID;
  const username = cookies.Name;
  const userID = cookies.userID;
  const name = cookies.team_name;
  const about = cookies.about;
  const admin = cookies.admin;
  const adminID = cookies.adminID;
  const itemID = cookies.itemID;
  const itemName = cookies.itemName;

  const config = { headers: { "Content-type": "application/json" } };

  const removeMember = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/removeMember",
        {
          itemID,
          teamID,
        },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addAdmin",
        { teamID, itemID },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          class="btn "
          data-bs-toggle="modal"
          data-bs-target={`#${item.id}`}
        >
          {username == item.name ? "You" : item.name}
          {item.min_admin == true && " (admin)"}
        </button>

        <div
          class="modal fade"
          id="makeAdmin"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                {item.min_admin == true
                  ? `Dismiss ${itemName} as admin`
                  : `Make ${itemName} admin?`}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={addAdmin}
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="removeMember"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                Remove {itemName} from {name}?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={removeMember}
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id={item.id}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
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
                      {(userID == adminID && adminID != item.id) ||
                      item.min_admin == true ? (
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#removeMember"
                          onClick={(e) => {
                            e.preventDefault();
                            setCookie("itemID", item.id);
                            setCookie("itemName", item.name);
                          }}
                        >
                          Remove {item.name} from {name}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="mb-3">
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();

                          setCookie("itemID", item.id);
                          setCookie("itemName", item.name);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#makeAdmin"
                      >
                        {(adminID != item.id && userID == adminID) ||
                        item.min_admin == true
                          ? item.min_admin == true
                            ? `Dismiss ${item.name} as admin`
                            : `Dismiss ${item.name} as admin`
                          : ""}

                        {adminID == userID ||
                        adminID != item.id ||
                        userID != item.id
                          ? ""
                          : `Dismiss ${item.name} as admin`}
                      </button>
                    </div>

                    <div item={item}>
                      {(userID == adminID && item.id != adminID) ||
                      item.min_admin == true ? (
                        <a
                          href="/addProject"
                          className="btn"
                          onClick={() => {
                            setCookie("itemID", item.id);
                            setCookie("itemName", item.name);
                          }}
                        >
                          Assign a project
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
