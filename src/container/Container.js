import React, { Component } from "react";
import Table from "../components/Table/Table";
import axios from "axios";

class Container extends Component {
  state = {
    name: "",
    height: "",
    mass: "",
    birth_year: "",
    homeworld: "",
    people: [],
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
      const updatedPeople = [...this.state.people];

      for (const object of response) {
        let resName = object.name;
        let resHeight = object.height;
        let resMass = object.mass;
        let resBirth_year = object.birth_year;
        let resHomeWorld = this.fetchHomeWorld(object.homeworld).then(home => {
          //console.log(home);
          return home;
        });

        updatedPeople.push({
          name: resName,
          height: resHeight,
          mass: resMass,
          birth_year: resBirth_year,
          homeplanet: resHomeWorld
        });
      }
      console.log(updatedPeople);
      this.setState({ people: updatedPeople, isLoading: false });
    });
  }

  fetchHomeWorld = async url => {
    return await axios
      .get(url)
      .then(home => {
        //console.log('home ', home.data.name)
        return home.data.name;
      })
      .catch(error => {
        console.log("Could not fetch Home world api");
      });
  };

  fetchStarWarCharacterDetails = (url, data, resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        const fetchedCharacters = data.concat(response.data.results);
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
