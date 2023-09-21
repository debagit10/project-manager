import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Addproject from "./Addproject";
import { useNavigate } from "react-router-dom";

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

  const itemID = item.id;

  const navigate = useNavigate();
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
        </button>

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
                      {adminID != item.id ? (
                        <button className="btn">
                          Remove {item.name} from team
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
                          console.log(itemID);
                        }}
                      >
                        {adminID != item.id && `Make ${item.name} an admin`}

                        {adminID != userID && `Dismiss ${item.name} as admin`}
                      </button>
                    </div>

                    <div item={item}>
                      {userID != item.id && (
                        <p
                          className="btn"
                          onClick={() => {
                            navigate("/addProject");
                            setCookie("itemID", item.id);
                            setCookie("itemName", item.name);
                          }}
                        >
                          Assign a project
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
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

export default Options;
