import React,{ useEffect } from "react";
import { Segment, Tab } from "semantic-ui-react";

import UserController from "../components/controllers/UserController";
import ResumeController from "../components/controllers/ResumeController";
import PositionController from "../components/controllers/PositionController";
import CityController from "../components/controllers/CityController";
import JobAdvertisementController from "../components/controllers/JobAdvertisementController";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
  let history = useHistory();

  const user = useSelector(state => state.user)
  useEffect(() => {
    if(user?.user?.user?.userType !== "personnel" || Object.keys(user.user).length === 0){
      history.push("/404")
    }
  }, []);

  const tabs = [
    {
      menuItem: "Users",
      render: () => <UserController />,
    },
    {
      menuItem: "Resume",
      render: () => <ResumeController />,
    },
    {
      menuItem: "Job Postings",
      render: () => <JobAdvertisementController />,
    },
    {
      menuItem: "Job Position",
      render: () => <PositionController />,
    },
    {
      menuItem: "City",
      render: () => <CityController />,
    },
  ];

  return (
    <div className="dashboard">
      <Segment raised>
        <Tab panes={tabs} menu={{ secondary: true }} />
        <br />
      </Segment>
    </div>
  );
}
