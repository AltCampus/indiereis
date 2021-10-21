import React from "react";
import { URL } from "../utils/static";
import { connect } from "react-redux";
import CountryModal from "./CountryModal";
import { Link, withRouter } from "react-router-dom";
import UserDash from "./UserDash";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Discover extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false,
    };
  }

  componentDidMount = () => {
    fetch(`${URL}/country`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({
          type: "SHOW_SCRAPPED_COUNTRIES",
          data: data.data[0],
        });
      });
  };

  searchCountry = (name) => {
    fetch(`${URL}/country/${name}`)
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({
          type: "FILTERED_COUNTRIES",
          data: data.data[0].country[0],
        });
        this.props.history.push("/discover/" + name);
      });
  };

  render() {
    const { data, filteredCountry } = this.props.scrappedCountries || null;

    return (
      <React.Fragment>
        <NavBar />
        <UserDash />
        <div style={{ marginBottom: "70px" }}>
          {data && data.country
            ? data.country.slice(0, 100).map((v, i) => {
                return (
                  <div
                    key={i}
                    className="country-container" /*onClick={() => this.searchCountry(v.name)}*/
                  >
                    <div className="container-main">
                      <div className="visa-head">
                        <div className="container-head">
                          <img src={v.flag} alt="flag" />
                          <p>{v.name}</p>
                        </div>
                        <p className="visa-btn">{v.Visa_Requirement}</p>
                      </div>
                      <p className="country-notes">{v.notes}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    scrappedCountries: state.Country,
  };
}

export default withRouter(connect(mapStateToProps)(Discover));
