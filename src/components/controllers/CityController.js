import React, { useState, useEffect } from 'react'
import DataTable from "../layouts/DataTableLayout/DataTable"
import CityService from "../../services/cityService";

import ListLoader from '../ListLoader';

export default function CityController() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService
      .getAll()
      .then((response) => setCities(response.data.data));
  }, []);

  const headerCells = [
    "Id",
    "City Name",
  ];

  var cells = []

  return (
    <>
      {cities.map((city) => {
        var cell = [];
        cell.push(city.id);
        cell.push(city.cityName);
        cells.push(cell)
      })}
      <DataTable headerCells={headerCells} cells={cells} />

      <ListLoader list={cities}/>
    </>
  );
}
