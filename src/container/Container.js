import React, { Component } from "react";
import { MDBBox } from "mdbreact";
import Table from "../components/Table/Table";
import SearchField from "../components/SearchField/SearchField";
import axios from "axios";
import classes from "./Container.module.css";

class Container extends Component {
  state = {
    people: [],
    searchStarWar: "",
    isLoading: true,
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.fetchStarWarCharacterDetails("/people", [], resolve, reject);
    }).then(async response => {
      const updatedPeople = [...this.state.people];

      for (const starWar of response) {
        let serialNum = response.indexOf(starWar) + 1;
        let resName = starWar.name;
        let resHeight =
          starWar.height !== "unknown"
            ? `${starWar.height} cm`
            : starWar.height;
        let resMass =
          starWar.mass !== "unknown" ? `${starWar.mass} lbs` : starWar.mass;
        let resBirth_year = starWar.birth_year;
        let resHomeWorld = await this.fetchHomeWorld(starWar.homeworld);
        let resSpecies = await this.fetchSpecies(starWar.species);
        let resStarShips = await this.fetchStarShips(starWar.starships);
        //console.log(resStarShips);

        updatedPeople.push({
          number: serialNum,
          name: resName,
          height: resHeight,
          mass: resMass,
          birthYear: resBirth_year,
          homePlanet: resHomeWorld,
          species: resSpecies[0] ? resSpecies[0].name : "unknown",
          classification: resSpecies[0]
            ? resSpecies[0].classification
            : "unknown",
          language:
            resSpecies[0] && resSpecies[0].language !== "n/a"
              ? resSpecies[0].language
              : "unknown",
          starShips: resStarShips.length > 0 ? resStarShips.join(', ') : 'Sorry! No Starship found'
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
        return home.data.name;
      })
      .catch(error => {
        this.setState({
          errorMessage:
            "Could not fetch Planets for Star Wars. Try again later.",
          error: true
        });
        return Promise.reject(error);
      });
  };

  fetchSpecies = async speciesArray => {
    try {
      const species = speciesArray.map(speciesUrl => {
        return axios.get(speciesUrl);
      });
      return (await axios.all(species)).map(response => response.data);
    } catch (error) {
      this.setState({
        errorMessage: "Could not fetch Species of Star Wars. Try again later.",
        error: true
      });
      return Promise.reject(error);
    }
  };

  fetchStarShips = async starShipsArray => {
    try {
      const starShips = starShipsArray.map(starShipUrl => {
        return axios.get(starShipUrl);
      });
      return (await axios.all(starShips)).map(response => response.data.name);
    } catch (error) {
      this.setState({
        errorMessage:
          "Could not fetch Starships for Star Wars. Refresh page and try again later.",
        error: true
      });
      return Promise.reject(error);
    }
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
        this.setState({
          errorMessage:
            "Something went wrong while fetching Star Wars. Please refresh the page and try again.",
          error: true
        });
        return Promise.reject(error);
      });
  };

  onChangeHandler = event => {
    this.setState({ searchStarWar: event.target.value });
  };

  render() {
    let filteredStarWars = this.state.people.filter(starWar => {
      return starWar.name
        .toLowerCase()
        .includes(this.state.searchStarWar.toLowerCase());
    });

    let displayData = (
      <p className={classes.Spinner}>
        Loading Your Star Wars...{" "}
        <span className="spinner-border spinner-border-sm" role="status"></span>
      </p>
    );

    if (this.state.error) {
      displayData = <p className={classes.Error}>{this.state.errorMessage}</p>;
    }

    if (!this.state.isLoading && !this.state.error) {
      displayData = (
        <>
          <MDBBox tag="section" display="flex" justifyContent="center">
            <SearchField change={this.onChangeHandler} />
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
