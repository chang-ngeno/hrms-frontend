import React from "react";
import {
  Grid,
  Header,
  Segment,
  Message,
  Tab,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import undraw_register from "../assets/images/undraw_register.png";
import EmployeeRegister from "../components/layouts/RegisterLayout/EmployeeRegister";
import EmployerRegister from "../components/layouts/RegisterLayout/EmployerRegister";

export default function Register() {
  const tabs = [
    {
      menuItem: "Worker",
      render: () => <EmployeeRegister />,
    },
    {
      menuItem: "Employer",
      render: () => <EmployerRegister />,
    },
  ];

  return (
    <>
      <Grid
        textAlign="center"
        // style={{ height: "80vh" }}
        // verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450, marginBottom: 20 }}>
          <Header as="h1" color="teal" textAlign="center">
            Register
          </Header>
          <Segment stacked>
            <Tab panes={tabs} menu={{ secondary: true }} />
          </Segment>
          <Message>
            <h4>
              Already have an account?
              <Link style={{ color: "#00b5ad" }} to="/login">
                Sign in!
              </Link>
            </h4>
          </Message>
        </Grid.Column>
      </Grid>
      <img
        src={undraw_register}
        width="560"
        alt="Undraw register"
        style={{ position: "fixed", top: 150, right: 10, zIndex: -1 }}
      />
    </>
  );
}
