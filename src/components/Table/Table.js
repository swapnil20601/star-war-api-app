import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import uuid from "react-uuid";

const Table = props => {
  const body = props.body.map((person, index) => {
    return (
      <tr key={uuid()}>
        <td>{index + 1}</td>
        <td>{person.name}</td>
        <td>{person.birth_year}</td>
        <td>{person.height} cm</td>
        <td>{person.mass} lbs</td>
        <td>{person.homeworld}</td>
      </tr>
    );
  });

  return (
    <MDBTable striped hover bordered responsiveSm>
      <MDBTableHead color="#616161 grey darken-2" textWhite>
        <tr>
          <th>#</th>
          <th>NAME</th>
          <th>BIRTH YEAR</th>
          <th>HEIGHT</th>
          <th>WEIGHT</th>
          <th>PLANET</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>{body}</MDBTableBody>
    </MDBTable>
  );
};

export default Table;
