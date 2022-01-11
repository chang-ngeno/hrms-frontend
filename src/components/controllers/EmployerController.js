import React, { useState, useEffect } from "react";
import DataTableProfile from "../layouts/DataTableLayout/DataTableProfile";
import DataTable from "../layouts/DataTableLayout/DataTable";
import EmployerService from "../../services/employerService";
import UserService from "../../services/userService";

import { waitUntil } from "async-wait-until";

import { Button } from "semantic-ui-react";
import * as constantsMethods from "../../constants/constantsMethods";
import HRMSMultiStateButton from "../../utilities/buttons/HRMSMultiStateButton";
import ListLoader from "../ListLoader";

export default function EmployerController() {
  const [employers, setEmployers] = useState([]);

  let employerService = new EmployerService();
  let userService = new UserService();

  useEffect(() => {
    employerService.getAll().then((response) => {
      setEmployers(response.data.data);
    });
  }, []);

  const headerCells = ["Id", "Company", "Telephone No", "E-Mail", "", ""];

  var cells = [];

  const verifiedStates = [
    {
      state: true,
      color: "green",
      text: "Verified",
      icon: "check circle",
    },
    {
      state: false,
      color: "teal",
      text: "Verify",
      icon: "pencil",
    },
  ];

  const handleVerify = (id, verified) => {
    userService
      .updateVerifiedById(verified, id)
      .then((response) =>
        constantsMethods.displayToast(
          response.data.success,
          response.data.message
        )
      );
  };

  const handleDelete = (id) => {
    employerService
      .deleteById(id)
      .then((response) =>
        constantsMethods.displayToast(
          response.data.success,
          response.data.message
        )
      );
  };

  return (
    <>
      {employers.map((employer) => {
        var cell = [];
        const verified = employer.user.verified;
        cell.push(employer.userId);
        cell.push(
          <DataTableProfile
            to={`/profile/${employer.userId}`}
            header={employer.companyName}
            subHeader={employer.website}
          />
        );
        cell.push(employer.phone);
        cell.push(employer.user.email);
        cell.push(
          <HRMSMultiStateButton
            states={verifiedStates}
            state={verified}
            onClick={() => {
              handleVerify(employer.userId, !verified);
              employer.user.verified = !verified;
              setEmployers([...employers]);
            }}
          />
        );
        cell.push(
          <Button
            color="red"
            onClick={() => {
              handleDelete(employer.userId);
              setEmployers([
                ...employers.filter((e) => e.userId != employer.userId),
              ]);
            }}
          >
            Delete the account
          </Button>
        );
        cells.push(cell);
      })}
      <DataTable headerCells={headerCells} cells={cells} />

      <ListLoader list={employers} />
    </>
  );
}
