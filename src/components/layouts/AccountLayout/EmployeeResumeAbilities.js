import React, { useState } from "react";
import { Button, List } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import HRMSInput from "../../../utilities/fields/HRMSInput";

import { useDispatch, useSelector } from "react-redux";
import { addAbility, getAllAbilities, deleteAbility } from "../../../store/actions/resumeActions";

export default function EmployeeResumeAbilities(props) {
  const dispatch = useDispatch()
  const resume = useSelector(state => state.resume)

  const validationSchema = Yup.object().shape({
    abilityName: Yup.string().required().max(30),
  });

  // let [submitting, setSubmitting] = useState(false);
  const initialValues = {
    abilityName: "",
    isSubmitting: false,
  };

  const onSubmit = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    resetForm(initialValues);
    values.resumeId = resume.resume.id;
    dispatch(addAbility(values))
    dispatch(getAllAbilities(resume.resume.id))
    setSubmitting(false);
  };

  return (
    <>
      <List horizontal relaxed style={{ marginBottom: "20px" }}>
        {resume.abilities.map((item, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                {item.abilityName}
                <Button
                  icon="delete"
                  size="mini"
                  circular
                  compact
                  color="red"
                  style={{ marginLeft: "5px" }}
                  onClick={() => dispatch(deleteAbility(item.id))}
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
            label="Skill Name"
            name="abilityName"
            placeholder="Skill Name"
          />
          <br />
          <Button type="submit" color="teal" fluid size="large">
            Add
          </Button>
        </Form>
      </Formik>
    </>
  );
}
