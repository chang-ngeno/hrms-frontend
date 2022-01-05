import React, { useState, useEffect } from "react";

import { Grid, Header, Segment, Button, FormGroup } from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import undraw_jobAdvertisementCreate from "../assets/images/undraw_jobAdvertisementCreate.png";

import PositionService from "../services/positionService";
import CityService from "../services/cityService";
import WorkingTimeService from "../services/workingTimeService";

import HRMSDropdown from "../utilities/fields/HRMSDropdown";
import HRMSInput from "../utilities/fields/HRMSInput";
import HRMSTextArea from "../utilities/fields/HRMSTextArea";

import * as constantsMethods from "../constants/constantsMethods";
import { useDispatch, useSelector } from "react-redux";
import { saveJobAdvertisement } from "../store/actions/jobAdvertisementActions";

export default function JobAdvertisementCreate() {
  const user = useSelector(state => state.user).user
  const dispatch = useDispatch()

  const [positions, setPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  useEffect(() => {
    let positionService = new PositionService();
    let cityService = new CityService();
    let workingTimeService = new WorkingTimeService();

    positionService
      .getAll()
      .then((response) => setPositions(response.data.data));
    cityService.getAll().then((response) => setCities(response.data.data));
    workingTimeService
      .getAll()
      .then((response) => setWorkingTimes(response.data.data));
  }, []);

  const positionOptions = constantsMethods.objectsToOptions(
    positions,
    "positionName",
    "id"
  );

  const cityOptions = constantsMethods.objectsToOptions(
    cities,
    "cityName",
    "id"
  );

  const workingTimeOptions = constantsMethods.objectsToOptions(
    workingTimes,
    "workingTimeName",
    "id"
  );

  const validationSchema = Yup.object().shape({
    deadline: Yup.date().required(),
    description: Yup.string().required().min(1).max(5000),
    positionId: Yup.number().positive().required(),
    workingTimeId: Yup.number().positive().required(),
    openPositionsAmount: Yup.number().required().min(1),
    cityId: Yup.number().positive().required(),
    minSalary: Yup.number().min(0),
    maxSalary: Yup.number().min(0),
  });

  const initialValues = {
    description: undefined,
    positionId: undefined,
    workingTimeId: undefined,
    cityId: undefined,
    openPositionsAmount: undefined,
    minSalary: undefined,
    maxSalary: undefined,
    deadline: undefined,
  };

  const onSubmit = (values) => {
    values.employerId = user.userId
    dispatch(saveJobAdvertisement(values))
  };

  return (
    <>
      <Grid
        // style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 800, marginBottom: 20 }}>
          <Header as="h1" color="teal" textAlign="center">
          Create a Job Posting
          </Header>

          <Segment stacked>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="ui form">
                <FormGroup widths="equal">
                  <HRMSDropdown
                    label="Job position *"
                    name="positionId"
                    placeholder="Job position *"
                    options={positionOptions}
                  />
                  <HRMSInput
                    label="Number of Open Positions *"
                    name="openPositionsAmount"
                    placeholder="Number of Open Positions *"
                    icon="briefcase"
                    iconPosition="left"
                  />
                </FormGroup>

                <FormGroup widths="equal">
                  <HRMSDropdown
                    label="City *"
                    name="cityId"
                    placeholder="City *"
                    options={cityOptions}
                  />
                  <HRMSDropdown
                    label="Way of Working *"
                    name="workingTimeId"
                    placeholder="Way of Working *"
                    options={workingTimeOptions}
                  />
                </FormGroup>

                <FormGroup widths="equal">
                  <HRMSInput
                    label="Min. Wage"
                    name="minSalary"
                    placeholder="Min. Wage"
                    icon="money"
                    iconPosition="left"
                    type="number"
                  />
                  <HRMSInput
                    label="Max. Wage"
                    name="maxSalary"
                    placeholder="Max. Wage"
                    icon="money"
                    iconPosition="left"
                    type="number"
                  />
                </FormGroup>

                <HRMSInput
                  label="Application deadline *"
                  name="deadline"
                  placeholder="Application deadline *"
                  icon="calendar alternate"
                  iconPosition="left"
                  type="date"
                />

                <HRMSTextArea
                  label="Description *"
                  name="description"
                  placeholder="Description *"
                  icon="file text"
                  iconPosition="left"
                />

                <br />
                <Button type="submit" color="teal" fluid size="large">
                  Create
                </Button>
              </Form>
            </Formik>
          </Segment>
        </Grid.Column>
      </Grid>
      <img
        src={undraw_jobAdvertisementCreate}
        width="560"
        style={{ position: "fixed", top: 150, right: 10, zIndex: -1 }}
      />
    </>
  );
}
