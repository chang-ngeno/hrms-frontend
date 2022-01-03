import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Button } from "semantic-ui-react";

import { saveResume } from "../../../store/actions/resumeActions";

export default function NoResumeError(props) {
  const dispatch = useDispatch()
  const createResume = () => {
    const emptyResume = { description: "", githubUrl: "", linkedinUrl: "", employeeId: props.user.userId}
    dispatch(saveResume(emptyResume))
  }
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "20vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 700 }}>
          <h2>
            It looks like you don't have a CV. <br/>Would you like to create now??
          </h2>
          <Button
            primary
            onClick={() => createResume()}
          >
            Create
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
}
