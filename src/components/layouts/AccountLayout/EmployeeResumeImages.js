import React from "react";
import { Button, List, Image } from "semantic-ui-react";

import { Formik, Form } from "formik";

import HRMSInput from "../../../utilities/fields/HRMSInput";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllImages,
  addImage,
  deleteImage,
} from "../../../store/actions/resumeActions";

export default function EmployeeResumeImages() {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume)

  const initialValues = {
    file: undefined,
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2))
    
    if(values.file === undefined){
      alert(JSON.stringify(values, null, 2))
      return null
    }
    values.resumeId = resume.resume.id;
    dispatch(addImage(values));
    dispatch(getAllImages(resume.resume.id));
  };

  return (
    <>
      <List horizontal relaxed style={{ marginBottom: "20px" }}>
        {resume.images.map((item, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                <Image src={item.imageUrl} size="tiny"/>
                <Button
                  icon="delete"
                  size="mini"
                  circular
                  compact
                  color="red"
                  style={{ marginLeft: "5px", position:"" }}
                  onClick={() => dispatch(deleteImage(item.id))}
                />
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="ui form">
          <HRMSInput
            label="Picture"
            name="file"
            icon="image"
            iconPosition="left"
            type="file"
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
