import React from "react";
import { Button, FormGroup } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import EmployerService from "../../../services/employerService";

import HRMSInput from "../../../utilities/fields/HRMSInput";
import HRMSPhoneInput from "../../../utilities/fields/HRMSPhoneInput";

import * as constantsMethods from "../../../constants/constantsMethods";

export default function EmployerRegister() {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required().min(1).max(100),
    website: Yup.string().required().min(1).max(100),
    email: Yup.string().email().required().min(1).max(100),
    phone: Yup.string().required().min(8).max(13),
    password: Yup.string().required().min(5).max(100),
    passwordRetry: Yup.string().required().min(5).max(100),
  });

  const initialValues = {
    companyName: undefined,
    website: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    passwordRetry: undefined,
  };

  const onSubmit = (values) => {
    const employerService = new EmployerService();

    employerService
      .save(values)
      .then((response) =>
        constantsMethods.displayToast(
          response.data.success,
          response.data.message
        )
      );
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <HRMSInput
            name="companyName"
            placeholder="Company Name"
            icon="building"
            iconPosition="left"
          />
          <HRMSInput
            name="website"
            placeholder="Website"
            icon="world"
            iconPosition="left"
          />

          <HRMSInput
            name="email"
            placeholder="E-Mail"
            icon="mail"
            iconPosition="left"
            type="email"
          />

          <HRMSPhoneInput
            name="phone"
            placeholder="Telephone No"
            icon="phone"
            iconPosition="left"
          />

          <FormGroup widths="equal">
            <HRMSInput
              name="password"
              placeholder="Password"
              icon="lock"
              iconPosition="left"
              type="password"
            />
            <HRMSInput
              name="passwordRetry"
              placeholder="Password Again"
              icon="lock"
              iconPosition="left"
              type="password"
            />
          </FormGroup>
          <br />
          <Button type="submit" color="teal" fluid size="large">
            Register
          </Button>
        </Form>
      </Formik>
    </>
  );
}
