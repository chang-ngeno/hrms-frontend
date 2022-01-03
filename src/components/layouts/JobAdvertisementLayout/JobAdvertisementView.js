import React, { useEffect, useState } from "react";
import { useParams } from "react-router";


import { Grid } from "semantic-ui-react";

import JobAdvertisementService from "../../../services/jobAdvertisementService";
import JobAdvertisementViewProfile from "./JobAdvertisementViewProfile";
import JobAdvertisementViewDetails from "./JobAdvertisementViewDetails";

export default function JobAdvertisementView({ ...props }) {
  let { id } = useParams();
  const [jobAdvertisement, setJobAdvertisement] = useState({});

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getById(id)
      .then((result) => setJobAdvertisement(result.data.data));
  }, []);

  return (
    <>
      <Grid style={{ marginTop: "40px", marginBottom: "25px" }}>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "left" }} width={4}>
            <h1>View posting Employer</h1>
            <JobAdvertisementViewProfile employer={jobAdvertisement.employer} />
          </Grid.Column>

          <Grid.Column style={{ textAlign: "left" }} width={12}>
            <h1>Advert</h1>
            <JobAdvertisementViewDetails jobAdvertisement={jobAdvertisement} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
