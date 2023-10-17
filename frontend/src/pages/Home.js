import React, { useEffect, useState } from "react";
import CreateTeam from "../team/CreateTeam";
import JoinTeam from "../team/JoinTeam";
import ViewTeams from "../components/ViewTeams";
import ViewProjects from "../components/ViewProjects";

const Home = () => {
  const [project, setProject] = useState(false);
  return (
    <div className="bg-slate-300 h-screen ">
      <div className="container pt-3 pb-5">
        <div className="flex flex-row-reverse">
          <JoinTeam />
          <CreateTeam />
        </div>

        <div>
          <div className="m-3 flex justify-center">
            <button
              className="btn  text-black m-5"
              onClick={() => setProject(true)}
            >
              Pending Projects
            </button>
            <button
              className="btn  text-black m-5"
              onClick={() => setProject(false)}
            >
              Your teams
            </button>
          </div>
          {project ? <ViewProjects /> : <ViewTeams />}
        </div>
      </div>
    </div>
  );
};

export default Home;
