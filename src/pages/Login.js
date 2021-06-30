import React from "react";

import {
  Grid,
  Header,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import undraw_login from "../assets/images/undraw_login.png";

import HRMSInput from "../utilities/fields/HRMSInput";
import { login } from "../store/actions/userActions";


export default function Login() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().min(1).max(100),
    password: Yup.string().required().min(1).max(100),
  });

  const pushToHome = () => {
    history.push("/")
  }

  const initialValues = {
    email: "hello@lativegames.com",
    password: "lative123",
  };

  const onSubmit = (values) => {
    dispatch(login(values))
    setTimeout(() => {
      if(JSON.stringify(user.user) !== {}){
        pushToHome()
      }
     }, 1);
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Giriş Yap
          </Header>
          <Segment stacked>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="ui form">
                <HRMSInput
                    name="email"
                    placeholder="E-Posta"
                    icon="mail"
                    iconPosition="left"
                    type="email"
                  />

                  <HRMSInput
                    name="password"
                    placeholder="Şifre"
                    icon="lock"
                    iconPosition="left"
                    type="password"
                  />

                <Button type="submit" color="teal" fluid size="large">
                  Giriş Yap
                </Button>
              </Form>
            </Formik>
          </Segment>
          <Message>
            <h4>
              Hesabınız yok mu?
              <Link style={{ color: "#00b5ad" }} to="/register">
                Kayıt olun!
              </Link>
            </h4>
          </Message>
        </Grid.Column>
      </Grid>
      <img
        src={undraw_login}
        width="560"
        style={{ position: "fixed", bottom: 350, right: 10, zIndex: -1 }}
      />
    </>
  );
}
