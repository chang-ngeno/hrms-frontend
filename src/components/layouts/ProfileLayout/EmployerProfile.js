import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import JobAdvertisementService from "../../../services/jobAdvertisementService";
import EmployerProfileDetails from "./EmployerProfileDetails";
import EmployerProfileJobAdvertisements from "./EmployerProfileJobAdvertisements";

export default function EmployerProfile(props) {
  const user = props.user;
  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  const jobAdvertisementService = new JobAdvertisementService();

  useEffect(() => {
    jobAdvertisementService
      .getByActiveTrueAndEmployerId(user.userId)
      .then((response) => setJobAdvertisements(response.data.data));
  }, []);

  return (
    <>
      <Grid.Row>
        <Grid.Column style={{ textAlign: "left" }} width={4}>
          <h1>Employer Profile</h1>
          <EmployerProfileDetails user={user}/>
        </Grid.Column>

        <Grid.Column style={{ textAlign: "left" }} width={12}>
          <h1>Business Classifieds</h1>
          {jobAdvertisements.length <= 0 ? (
            <h3>The Employer has no job posting information yet!</h3>
          ) : (
            <EmployerProfileJobAdvertisements jobAdvertisements = {jobAdvertisements}/>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
}
