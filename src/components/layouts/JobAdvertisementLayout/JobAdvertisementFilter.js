import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Segment, Divider, Button } from "semantic-ui-react";

import HRMSInput from "../../../utilities/fields/HRMSInput";
import HRMSDropdown from "../../../utilities/fields/HRMSDropdown";
import HRMSMultiDropdown from "../../../utilities/fields/HRMSMultiDropdown";

import PositionService from "../../../services/positionService";
import CityService from "../../../services/cityService";
import WorkingTimeService from "../../../services/workingTimeService";

import * as constantsMethods from "../../../constants/constantsMethods";

export default function JobAdvertisementFilter({ handleOnFilter }) {
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
    search: Yup.string().min(1).max(25),
    minSalary: Yup.number(),
    maxSalary: Yup.number()
  });

  const initialValues = {
    search: undefined,
    positionIds: undefined,
    cityIds: undefined,
    workingTimeIds: undefined,
    minSalary: undefined,
    maxSalary: undefined
  };

  const onSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2))
    handleOnFilter(values)
  };

  return (
    <>
      <h1>Filters</h1>
      <Segment raised style={{ textAlign: "left", padding: "15px" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="ui large form">
            <HRMSInput
              name="search"
              placeholder="Search"
              icon="search"
              iconPosition="left"
            />
            <Divider clearing />
            <HRMSMultiDropdown
              name="positionIds"
              placeholder="Job position"
              options={positionOptions}
            />
            <Divider hidden />
            <HRMSMultiDropdown
              name="cityIds"
              placeholder="City"
              multiple
              selection
              options={cityOptions}
            />
            <Divider hidden />
            <HRMSMultiDropdown
              name="workingTimeIds"
              placeholder="Way of Working"
              multiple
              selection
              options={workingTimeOptions}
            />
            <Divider clearing />
            <HRMSInput
              name="minSalary"
              placeholder="Min. Wage"
              icon="money"
              iconPosition="left"
              type="number"
            />
            <HRMSInput
              name="maxSalary"
              placeholder="Max. Wage"
              icon="money"
              iconPosition="left"
              type="number"
            />

            <Button fluid color="teal" size="large" style={{ marginTop:"35px" }} type="submit">
              Filter
            </Button>
          </Form>
        </Formik>
      </Segment>
    </>
  );
}
