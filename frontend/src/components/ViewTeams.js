import React, { useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//import Project from "./Project";
import DataTable from "react-data-table-component";

const ViewTeams = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const getTeams = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getTeams",
        {
          userID,
        },
        config
      );
      const team = response.data;
      setTeams(team);
      //console.log(team);
      if (team.error) {
        setError(team.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "55px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.team_name,
    },
    {
      name: "Owner",
      selector: (row) => (row.admin_id == userID ? "You" : row.admin),
    },
    {
      name: "About",
      selector: (row) => row.about,
    },
  ];

  useEffect(() => {
    getTeams();
  });

  return (
    <div>
      <DataTable columns={columns} data={teams} customStyles={customStyles} />
    </div>
  );
};

export default ViewTeams;
