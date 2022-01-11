import React from "react";
import {
    Grid,
    Header,
    Segment,
    Button,
} from "semantic-ui-react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import * as constantsMethods from "../../constants/constantsMethods";
import HRMSInput from "../../utilities/fields/HRMSInput";
import WorkingTimeService from "../../services/workingTimeService";

export default function Position() {

    const validationSchema = Yup.object().shape({
        workingTimeName: Yup.string().required().min(5).max(60)
    });

    const initialValues = {
        workingTimeName: undefined
    };

    // call the api to save
    const onSubmit = (values) => {
        console.log("do you want to save the position");
        const workingTimeService = new WorkingTimeService();

        workingTimeService
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
            <Grid
                textAlign="center"
                // style={{ height: "80vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450, marginBottom: 20 }}>
                    <Header as="h1" color="teal" textAlign="center">
                        Create a position
                    </Header>
                    <Segment stacked>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form className="ui form">
                                <HRMSInput
                                    name="workingTimeName"
                                    placeholder="Working Time Name"
                                    icon="clock"
                                    iconPosition="left"
                                    type="text"
                                />
                                <Button type="submit" color="teal" fluid size="large">
                                    Save
                                </Button>
                            </Form>
                        </Formik>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    );
}