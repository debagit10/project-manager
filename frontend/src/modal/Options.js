import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import Addproject from "./Addproject";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { APIURL } from "../env";

const Options = ({ item }) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [isAdmin, setIsAdmin] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const teamID = cookies.teamID;
  const username = cookies.Name;
  const userID = cookies.userID;
  const name = cookies.team_name;
  const about = cookies.about;
  const admin = cookies.admin;
  const adminID = cookies.adminID;
  const itemName = cookies.itemName;
  const itemID = item.id;
  const itemEmail = item.email;

  const config = { headers: { "Content-type": "application/json" } };

  const min_admin = async () => {
    const data = {
      teamID: teamID,
      userID: userID,
    };
    try {
      const response = await axios.get(`${APIURL}/api/team/admin`, {
        params: data,
      });
      //console.log(response);
      setIsAdmin(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isAdmin);

  const removeMember = async () => {
    const data = {
      itemID: itemID,
      teamID: teamID,
    };
    try {
      const response = await axios.delete(`${APIURL}/api/team/removeMember`, {
        params: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = async () => {
    const data = {
      itemID: itemID,
      teamID: teamID,
    };
    try {
      const response = await axios.put(`${APIURL}/api/admin/add`, data, config);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAdmin = async () => {
    const data = {
      itemID: itemID,
      teamID: teamID,
    };
    try {
      const response = await axios.put(
        `${APIURL}/api/admin/remove`,
        data,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    min_admin();
  }, []);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="mb-2"
        sx={{ color: "black" }}
      >
        {item.name}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent>
          {isAdmin.min_admin == true ||
          (userID == adminID && item.min_admin == null) ? (
            <Button
              onClick={() => {
                addAdmin();
                setOpen(false);
              }}
              sx={{ color: "black" }}
            >
              {item.min_admin != true &&
                adminID != item.id &&
                `Make ${item.name} an admin`}
            </Button>
          ) : (
            isAdmin.min_admin == true ||
            (userID == adminID && item.min_admin == true && (
              <Button
                onClick={() => {
                  removeAdmin();
                  setOpen(false);
                }}
                sx={{ color: "black" }}
              >
                {item.min_admin == true &&
                  adminID != item.id &&
                  adminID == userID &&
                  `Dismiss ${item.name} as admin`}
              </Button>
            ))
          )}
          {}
          <br />
          {(userID == adminID && item.id != adminID && (
            <Button
              onClick={() => {
                navigate("/add_project");
                setCookie("itemID", item.id);
                setCookie("itemName", item.name);
                setCookie("itemEmail", item.email);
              }}
              sx={{ color: "black" }}
            >
              Assign a project
            </Button>
          )) ||
            (isAdmin.min_admin == true && (
              <Button
                onClick={() => {
                  navigate("/add_project");
                  setCookie("itemID", item.id);
                  setCookie("itemName", item.name);
                  setCookie("itemEmail", item.email);
                }}
                sx={{ color: "black" }}
              >
                Assign a project
              </Button>
            ))}
          <br />
          {userID == adminID || isAdmin.min_admin == true ? (
            <Button
              onClick={() => {
                removeMember();
                setOpen(false);
              }}
              sx={{ color: "black" }}
            >
              Remove {item.name} from {name}
            </Button>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Options;
