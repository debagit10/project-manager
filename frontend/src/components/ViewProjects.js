import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ViewTeams from "../components/ViewTeams";
import DataTable from "react-data-table-component";

const ViewProjects = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [error, setError] = useState();
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const userID = cookies.userID;
  const username = cookies.Name;
  const token = cookies.Token;

  const config = { headers: { "Content-type": "application/json" } };

  const getProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getProject",
        {
          userID,
        },
        config
      );

      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getProject();
    }
  });

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
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "By",
      selector: (row) => (row.assigned_by == userID ? "You" : row.name),
    },
    {
      name: "Team",
      selector: (row) => row.team_name,
    },
  ];

  return (
    <div className="hover:bg-slate-400">
      <DataTable
        columns={columns}
        data={projects}
        customStyles={customStyles}
      />
    </div>
  );
};

export default ViewProjects;
