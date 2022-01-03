import React, { useState, useEffect } from "react";
import { Button, FormGroup } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import EmployeeService from "../../../services/employeeService";
import PositionService from "../../../services/positionService";

import HRMSDropdown from "../../../utilities/fields/HRMSDropdown";
import HRMSInput from "../../../utilities/fields/HRMSInput";

import * as constantsMethods from "../../../constants/constantsMethods";

export default function EmployeeRegister() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let positionService = new PositionService();
    positionService
      .getAll()
      .then((response) => setPositions(response.data.data));
  }, []);

  const positionOptions = constantsMethods.objectsToOptions(
    positions,
    "positionName",
    "id"
  );

  const ageLimit = Number(new Date().getFullYear() - 18);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(1).max(25),
    lastName: Yup.string().required().min(1).max(20),
    identityNo: Yup.string().required().min(5).max(9),
    birthYear: Yup.number().required().min(1900).max(ageLimit),
    positionId: Yup.number().required(),
    email: Yup.string().email().required().min(1).max(100),
    password: Yup.string().required().min(5).max(100),
    passwordRetry: Yup.string().required().min(5).max(100),
  });

  const initialValues = {
    firstName: undefined,
    lastName: undefined,
    identityNo: undefined,
    birthYear: undefined,
    positionId: undefined,
    email: undefined,
    password: undefined,
    passwordRetry: undefined,
  };

  const onSubmit = (values) => {
    const employeeService = new EmployeeService();

    employeeService
      .save(values)
      .then((response) =>
        constantsMethods.displayToast(
          response.data.success,
          response.data.message
        )
      );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <FormGroup widths="equal">
            <HRMSInput
              name="firstName"
              placeholder="First Name"
              icon="user"
              iconPosition="left"
            />
            <HRMSInput
              name="lastName"
              placeholder="Surname"
              icon="user"
              iconPosition="left"
            />
          </FormGroup>
          <HRMSInput
            name="identityNo"
            placeholder="National Identification Number"
            icon="id card"
            iconPosition="left"
          />
          <HRMSInput
            name="birthYear"
            placeholder={`Birth Year (1940-${ageLimit})`}
            icon="birthday"
            iconPosition="left"
            type="number"
          />
          <HRMSDropdown
            name="positionId"
            placeholder="Job position *"
            options={positionOptions}
          />
          <HRMSInput
            name="email"
            placeholder="E-Mail"
            icon="mail"
            iconPosition="left"
            type="email"
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
