import React, { useState, useEffect } from "react";
import { Button, FormGroup } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import HRMSInput from "../../../utilities/fields/HRMSInput";

import { useDispatch } from "react-redux";
import { updatePassword } from "../../../store/actions/userActions";

export default function EmployeeAccountChangePassword(props) {
  const { user } = { ...props };
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required().max(100),
    newPassword: Yup.string().required().max(100),
    newPasswordRetry: Yup.string().required().max(100),
  });

  const initialValues = {
    oldPassword: undefined,
    newPassword: undefined,
    newPasswordRetry: undefined,
  };

  const onSubmit = (values) => {
    values.id = user.userId;
    dispatch(updatePassword(values));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <HRMSInput
            label="Old Password"
            name="oldPassword"
            placeholder="Old Password"
            icon="lock"
            iconPosition="left"
            type="password"
          />
          <FormGroup widths="equal">
            <HRMSInput
              label="New Password"
              name="newPassword"
              placeholder="New Password"
              icon="lock"
              iconPosition="left"
              type="password"
            />
            <HRMSInput
              label="New Password Again"
              name="newPasswordRetry"
              placeholder="Old Password"
              icon="lock"
              iconPosition="left"
              type="password"
            />
          </FormGroup>

          <br />
          <Button type="submit" color="teal" fluid size="large">
            Change Password
          </Button>
        </Form>
      </Formik>
    </>
  );
}
