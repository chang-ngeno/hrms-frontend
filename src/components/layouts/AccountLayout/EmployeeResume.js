import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";

import EmployeeResumeDetails from "./EmployeeResumeDetails";
import EmployeeResumeAbilities from "./EmployeeResumeAbilities";
import EmployeeResumeLanguages from "./EmployeeResumeLanguages";
import EmployeeResumeJobExperiences from "./EmployeeResumeJobExperiences";
import EmployeeResumeSchools from "./EmployeeResumeSchools";
import EmployeeResumeImages from "./EmployeeResumeImages";

import NoResumeError from "./NoResumeError";
import { useSelector } from "react-redux";

export default function EmployeeResume(props) {
  const user = props.user;
  const resume = useSelector((state) => state.resume);

  const tabs = [
    {
      menuItem: "Detail",
      render: () => <EmployeeResumeDetails />,
    },
    {
      menuItem: "Skills",
      render: () => <EmployeeResumeAbilities />,
    },
    {
      menuItem: "Languages",
      render: () => <EmployeeResumeLanguages />,
    },
    {
      menuItem: "Work experiences",
      render: () => <EmployeeResumeJobExperiences />,
    },
    {
      menuItem: "Schools",
      render: () => <EmployeeResumeSchools />,
    },
    {
      menuItem: "Pictures",
      render: () => <EmployeeResumeImages />,
    },
  ];

  return (
    <>
      {JSON.stringify(resume.resume) != {} && resume.resume != null ? (
        <Tab panes={tabs} menu={{ secondary: true }} />
      ) : (
        <NoResumeError user={user} />
      )}
    </>
  );
}
