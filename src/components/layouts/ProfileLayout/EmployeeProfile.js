import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EmployeeProfileDetails from "./EmployeeProfileDetails";
import EmployeeProfileResume from "./EmployeeProfileResume";

import ResumeService from "../../../services/resumeService";

export default function EmployeeProfile(props) {
  const user = props.user;
  const [resume, setResume] = useState({});

  const resumeService = new ResumeService();

  useEffect(() => {
    resumeService
      .getByEmployeeId(user.userId)
      .then((response) => setResume(response.data.data));
  }, []);

  return (
    <>
      <Grid.Row>
        <Grid.Column style={{ textAlign: "left" }} width={4}>
          <h1>Employee Profile</h1>
          <EmployeeProfileDetails user={user} resume={resume}/>
        </Grid.Column>

        <Grid.Column style={{ textAlign: "left" }} width={12}>
          <h1>Resume</h1>
          {resume == null ||
          resume === undefined ||
          JSON.stringify(resume) === {} ? (
            <h3>Employee has no resume information</h3>
          ) : (
            <EmployeeProfileResume resume={resume} />
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
}
