import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";

export default function NotFound() {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <h1 style={{ fontSize: 28 }}>
            You are looking for <span style={{ color: "#ffd45a" }}>page</span>{" "}
            not found!
          </h1>
          <p style={{ fontSize: 20 }}>Sorry, 😕</p>

          <Button color="teal" circular as={Link} to="/">
            Go to Homepage
          </Button>

          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_ndk1Mk.json"
            background="transparent"
            speed="0.75"
            autoplay
          />
        </Grid.Column>
      </Grid>
    </>
  );
}
