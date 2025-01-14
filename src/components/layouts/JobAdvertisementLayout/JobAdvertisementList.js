import React, { useState, useEffect } from "react";

import { Dimmer, Loader, Pagination, Icon, Dropdown } from "semantic-ui-react";

import JobAdvertisementItem from "./JobAdvertisementItem";

import * as constantsMethods from "../../../constants/constantsMethods";
import ListLoader from "../../ListLoader";

export default function JobAdvertisementList({
  jobAdvertisements,
  handlePagination,
  handlePaginationCount,
  activePage,
  setActivePage,
  total,
  totalPages,
}) {
  const [value, setValue] = useState(10);

  const paginations = [
    { paginationName: "1 Advert", value: 1 },
    { paginationName: "10 Advert", value: 10 },
    { paginationName: "25 Advert", value: 25 },
    { paginationName: "50 Advert", value: 50 },
    { paginationName: "100 Advert", value: 100 },
  ];

  const paginationOptions = constantsMethods.objectsToOptions(
    paginations,
    "paginationName",
    "value"
  );

  return (
    <>
      <div className="header" style={{ display: "flex", width: "100%" }}>
        <h1>Classifieds</h1>
        <span style={{ marginLeft: "auto", color: "grey" }}>
          {jobAdvertisements.length > 0
            ? jobAdvertisements.length + " ad found"
            : null}
        </span>
      </div>
      <ListLoader list={jobAdvertisements} height={465}/>

      {jobAdvertisements?.map((item) => (
        <JobAdvertisementItem key={item.id} item={item} />
      ))}

      <div style={{ display: "flex", width: "100%" }}>
        <Pagination
          firstItem={null}
          lastItem={null}
          activePage={activePage}
          onPageChange={handlePagination}
          totalPages={totalPages}
        />

        <Dropdown
          onChange={(e, data) => {
            setActivePage(1)
            setValue(data.value);
            handlePaginationCount(data.value);
          }}
          selection
          defaultValue={value}
          text={"Pagination - " + value}
          style={{ marginLeft: "auto" }}
          options={paginationOptions}
        />
      </div>
    </>
  );
}
