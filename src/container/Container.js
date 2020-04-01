import React, { Component } from "react";
import { MDBBox } from "mdbreact";
import Table from "../components/Table/Table";
import SearchField from '../components/SearchField/SearchField';
import axios from "axios";
import classes from "./Container.module.css";

class Container extends Component {
  state = {
    name: "",
    height: "",
    mass: "",
    birth_year: "",
    homeworld: "",
    people: [],
    searchStarWar: "",
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
        let serialNum = response.indexOf(object) + 1;
        let resName = object.name;
        let resHeight = object.height;
        let resMass = object.mass;
        let resBirth_year = object.birth_year;
        let resHomeWorld = this.fetchHomeWorld(object.homeworld).then(home => {
          //console.log(home);
          return home;
        });

        updatedPeople.push({
          number: serialNum,
          name: resName,
          height: resHeight,
          mass: resMass,
          birthYear: resBirth_year
          //homePlanet: resHomeWorld
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

  onChangeHandler = (event) => {
    this.setState({searchStarWar: event.target.value});
  }


  render() {
    let filteredStarWars = this.state.people.filter(starWar => {
      return starWar.name.toLowerCase().includes(this.state.searchStarWar.toLowerCase())
    })

    let displayData = (
      <p className={classes.Spinner}>
        Loading...{" "}
        <span className="spinner-border spinner-border-sm" role="status"></span>
      </p>
    );

    if (!this.state.isLoading) {
      displayData = (
        <>
          <MDBBox tag="section" display="flex" justifyContent="center">
            <SearchField change={this.onChangeHandler}/>
          </MDBBox>
          <MDBBox tag="section">
            <Table body={filteredStarWars} />
          </MDBBox>
        </>
      );
    }
    return <div className="container">{displayData}</div>;
  }
}

export default Container;
