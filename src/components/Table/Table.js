import { MDBDataTable } from "mdbreact";
import React from "react";
import classes from "./Table.module.css";

const Table = (props) => {
  const data = {
    columns: [
      {
        label: "Sr.No.",
        field: "number",
      },
      {
        label: "NAME",
        field: "name",
      },
      {
        label: "HEIGHT(cm)",
        field: "height",
      },
      {
        label: "WEIGHT(lbs)",
        field: "mass",
      },
      {
        label: "BIRTH YEAR",
        field: "birthYear",
      },
      {
        label: "PLANET",
        field: "homePlanet",
      },
      {
        label: "SPECIES",
        field: "species",
      },
      {
        label: "CLASSIFICATION",
        field: "classification",
      },
      {
        label: "LANGUAGE",
        field: "language",
      },
      {
        label: "STARSHIPS",
        field: "starShips",
      },
    ],
    rows: props.body,
  };

  return (
    <MDBDataTable
      className={classes.MyTable}
      autoWidth
      maxHeight="100px"
      striped
      hover
      responsiveSm
      noBottomColumns
      order={["number", "asc"]}
      entriesLabel="Show Star Wars"
      infoLabel={["Showing", "to", "of", "Star Wars"]}
      theadTextWhite
      theadColor="#616161 grey darken-2"
      searching={false}
      data={data}
    ></MDBDataTable>
  );
};

export default Table;
