import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Grid, Segment } from "semantic-ui-react";
import Sidebar from "../components/layouts/SidebarLayout/Sidebar";

import EmployeeAccountDetails from "../components/layouts/AccountLayout/EmployeeAccountDetails";
import EmployeeResume from "../components/layouts/AccountLayout/EmployeeResume";

import EmployerAccountDetails from "../components/layouts/AccountLayout/EmployerAccountDetails";
import EmployerJobAdvertisements from "../components/layouts/AccountLayout/EmployerJobAdvertisements";
export default function Account() {
  const user = useSelector((state) => state.user);

  const options = [
    {
      userType: "employee",
      content: [
        {
          name: "accountDetails",
          text: "Hesap Ayrıntıları",
          component: <EmployeeAccountDetails user={user.user} />,
        },
        {
          name: "resume",
          text: "Özgeçmişi Düzenle",
          component: <EmployeeResume user={user.user} />,
        },
      ],
    },
    {
      userType: "employer",
      content: [
        {
          name: "accountDetails",
          text: "Hesap Ayrıntıları",
          component: <EmployerAccountDetails user={user.user} />,
        },
        {
          name: "jobAdvertisements",
          text: "İş İlanları",
          component: <EmployerJobAdvertisements user={user.user} />,
        }
      ],
    },
  ];

  const option = options.filter((o) => o.userType == user.user.user.userType)[0]
    .content;

  const [component, setComponent] = useState(option[0].component);
  const handleComponent = (component) => {
    setComponent(component);
  };

  return (
    <>
      <Grid style={{ marginTop: "40px", marginBottom: "25px" }}>
        <h1>Hesap</h1>

        <Grid.Row>
          <Grid.Column style={{ textAlign: "left" }} width={4}>
            <Sidebar options={option} handleComponent={handleComponent} />
          </Grid.Column>

          <Grid.Column style={{ textAlign: "left" }} width={12}>
            <Segment raised>{component}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
