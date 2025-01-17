import React from "react";
import { Button, List, FormGroup } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import HRMSInput from "../../../utilities/fields/HRMSInput";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobExperiences,
  addJobExperience,
  deleteJobExperience,
} from "../../../store/actions/resumeActions";

export default function EmployeeResumeJobExperiences(props) {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume)

  const currentYear = Number(new Date().getFullYear());

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required().max(50),
    positionName: Yup.string().required().max(30),
    startYear: Yup.number().required().min(1940).max(currentYear),
    endYear: Yup.number().min(1940).max(currentYear),
  });

  const initialValues = {
    companyName: undefined,
    positionName: undefined,
    startYear: undefined,
    endYear: undefined,
  };

  const onSubmit = (values) => {
    values.resumeId = resume.resume.id;
    dispatch(addJobExperience(values));
    dispatch(getAllJobExperiences(resume.resume.id));
  };

  return (
    <>
      <List horizontal relaxed style={{ marginBottom: "20px" }}>
        {resume.jobExperiences.map((item, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                {item.companyName}
                <span style={{ color: "gray", marginLeft: "5px" }}>
                  {item.positionName}
                </span>
                <Button
                  icon="delete"
                  size="mini"
                  circular
                  compact
                  color="red"
                  style={{ marginLeft: "5px" }}
                  onClick={() => dispatch(deleteJobExperience(item.id))}
                />
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <HRMSInput
            label="Company Name"
            name="companyName"
            placeholder="Company Name"
            icon="building"
            iconPosition="left"
          />
          <HRMSInput
            label="Job position"
            name="positionName"
            placeholder="Job position"
            icon="briefcase"
            iconPosition="left"
          />
          <FormGroup widths="equal">
            <HRMSInput
              label="Starting Year"
              name="startYear"
              placeholder={`Starting Year (1940-${currentYear})`}
              icon="calendar outline"
              iconPosition="left"
              type="number"
            />
            <HRMSInput
              label="End Year"
              name="endYear"
              placeholder={`End Year (1940-${currentYear})`}
              icon="calendar outline"
              iconPosition="left"
              type="number"
            />
          </FormGroup>

          <br />
          <Button type="submit" color="teal" fluid size="large">
            Add
          </Button>
        </Form>
      </Formik>
    </>
  );
}
