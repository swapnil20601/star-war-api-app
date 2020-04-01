import { MDBDataTable } from "mdbreact";
import React from "react";
import classes from "./Table.module.css";

const Table = props => {
  const data = {
    columns: [
      {
        label: "Sr.No.",
        field: "number",
        width: 20
      },
      {
        label: "NAME",
        field: "name",
        width: 200
      },
      {
        label: "HEIGHT(cm)",
        field: "height",
        width: 70
      },
      {
        label: "WEIGHT(lbs)",
        field: "mass",
        width: 70
      },
      {
        label: "BIRTH YEAR",
        field: "birthYear",
        width: 100
      },
      {
        label: "PLANET",
        field: "homePlanet",
        width: 120
      }
    ],
    rows: props.body
  };

  return (
    <MDBDataTable
      className={classes.MyTable}
      maxHeight="130px"
      striped
      hover
      responsiveSm
      noBottomColumns
      order={["number", "asc"]}
      theadTextWhite
      theadColor="#616161 grey darken-2"
      searching={false}
      data={data}
    ></MDBDataTable>
  );
};

export default Table;
