import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";

const searchField = (props) => {
  return (
    <MDBCol md="10">
      <form className="form-inline pt-4 pb-2 mt-5 mb-5">
        <MDBIcon icon="search" />
        <input
          className="form-control form-control ml-3 w-75"
          type="text"
          placeholder="Search For Your Favourite Star War"
          aria-label="Search"
          onChange={props.change}
        />
      </form>
    </MDBCol>
  );
};

export default searchField;
