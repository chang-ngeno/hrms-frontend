import React from "react";
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Divider,
} from "semantic-ui-react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Segment
        className="no-theme"
        inverted
        vertical
        style={{
          position: "static",
          bottom: 0,
          padding: "20px",
          width: "100%",
        }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Links" />
              <List link inverted>
                <List.Item as={Link} to="/">
                  Home page
                </List.Item>
                {/* <List.Item as={Link} to="/dashboard">
                  Panel
                </List.Item>
                <List.Item as={Link} to="/login">
                  Login
                </List.Item>
                <List.Item as={Link} to="/register">
                  Register
                </List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="References" />
              <List link inverted>
                <List.Item as="a" href="https://changsoft.buzz">
                  ChangSoft Technologies
                </List.Item>
                <List.Item as="a" href="https://macoz.co.ke">
                  Daniel C.
                </List.Item>
                <List.Item
                  as="a"
                  href="https://github.com/chang-ngeno/hrms-frontend"
                >
                  Front-End Github
                </List.Item>
                <List.Item as="a" href="https://github.com/chang-ngeno/hrms-backend">
                  Back-End Github
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted>Human Resources Management System</Header>
              {/* <p>(İnsan Kaynakları Yönetim Sistemi)</p> */}
              <p>
                This system{" "}
                <a
                  className="blue-text"
                  target="_blank"
                  href="https://changsoft.buzz"
                >
                  ChangSoft HRMS
                </a>{" "}
                by
                <a
                  className="blue-text"
                  target="_blank"
                  href="https://macoz.co.ke"
                >
                  {" "}
                  Daniel C.
                </a>{" "}
                made with help of James K.
              </p>
            </Grid.Column>
          </Grid>
          <Divider inverted section />
          <Link to="/home" style={{ color: "#00b5ad" }}>
            <h1
              className="logo-footer"
              style={{ fontSize: 35, paddingTop: 10 }}
            >
              ChangSoft HRMS
            </h1>
          </Link>
          <br />
          All rights reserved.
          <br />
          &copy; and done with
          <br />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" target="_blank" href="https://changsoft.buzz">
              Daniel C.
            </List.Item>
            <List.Item as="a" target="_blank" href="https://macoz.co.ke">
              James K.
            </List.Item>
          </List>
        </Container>
      </Segment>
    </>
  );
}
