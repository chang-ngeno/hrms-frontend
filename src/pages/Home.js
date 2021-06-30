import React from "react";

import {
  Grid,
  Header,
  Segment,
  Button,
  FormGroup,
  Card,
  Divider,
  Form,
  Input,
} from "semantic-ui-react";

import "../assets/css/style.css";
import JobAdvertisementFilter from "../components/layouts/JobAdvertisementLayout/JobAdvertisementFilter";
import JobAdvertisementList from "../components/layouts/JobAdvertisementLayout/JobAdvertisementList";

export default function Home() {
  return (
    <>
      <Grid style={{ marginTop: "40px", marginBottom: "25px" }}>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "left" }} width={4}>
            <JobAdvertisementFilter />
          </Grid.Column>

          <Grid.Column style={{ textAlign: "left" }} width={12}>
            <JobAdvertisementList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
