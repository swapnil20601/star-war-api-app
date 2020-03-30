import React, { Component } from "react";
import Table from "../components/Table/Table";
import axios from "axios";

class Container extends Component {
  state = {
    people: [],
    homeWorld: [],
    isLoading: true
  };

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.fetchStarWarCharacterDetails(
        "https://swapi.co/api/people",
        [],
        resolve,
        reject
      );
    }).then(response => {
    console.log(response);
      this.setState({ people: response, isLoading: false });
    });
  }

  fetchStarWarCharacterDetails = (url, people, resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        const fetchedCharacters = people.concat(response.data.results);
        if (response.data.next !== null) {
          this.fetchStarWarCharacterDetails(
            response.data.next,
            fetchedCharacters,
            resolve,
            reject
          );
        } else {
          resolve(fetchedCharacters);
        }
      })
      .catch(error => {
        console.log(error);
        reject("Something wrong. Please refresh the page and try again.");
      });
  };

  render() {
    let displayData = <p>Loading...</p>;
    if (!this.state.isLoading) {
      displayData = (
        <>
          <Table body={this.state.people} />
        </>
      );
    }
    return <div className="container">{displayData}</div>;
  }
}

export default Container;
