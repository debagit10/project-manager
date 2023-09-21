import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Addproject = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [document, setDocument] = useState();
  const [links, setLinks] = useState();
  const [deadline, setDeadline] = useState();

  const name = cookies.itemName;
  const itemID = cookies.itemID;
  const userID = cookies.userID;
  const team = cookies.teamID;

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    const response = await axios.post(
      "http://localhost:5000/addProject",
      {
        itemID,
        userID,
        title,
        description,
        document,
        links,
        deadline,
        team,
      },
      config
    );
    console.log(response);
  };

  return (
    <div className="container">
      <h6>Assign project to : {name}</h6>
      <div class="mb-3">
        <label class="form-label">Name of project</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea
          class="form-control"
          rows="3"
          placeholder="A short note about the project"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Link (if necessary)</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => setLinks(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">
          Upload a file (if necessary)
        </label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          onChange={(e) => setDocument(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Deadline</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button className="btn" onClick={submit}>
          Submit project
        </button>
      </div>
    </div>
  );
};

export default Addproject;
