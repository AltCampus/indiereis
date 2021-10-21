import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import UserDash from "./UserDash";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../reducers/User";
import { URL, countries, tripDetails } from "../utils/static";

class Contribute extends React.Component {
  state = {
    country: "",
    terms: false,
    kindOfTrip: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleToggle = (e) => {
    this.setState({ terms: !this.state.terms });
  };

  handleSubmit = () => {
    this.props.dispatch({
      type: "ADD_COUNTRY",
      data: this.state,
    });
    this.setState({});
    this.props.history.push("/form");
  };

  render() {
    const { loggeduser } = this.props;
    const { country, terms, kindOfTrip } = this.state;
    return (
      <div>
        <NavBar />
        <UserDash />
        {loggeduser.isAuthInProgress ? (
          <div className="is-small contribute">
            <div>
              Thank you for showing interest in contributing to the project.
            </div>
            <Link to="/login" className="button is-primary">
              Login
            </Link>
          </div>
        ) : loggeduser.isAuthenticated ? (
          <div className="is-small contribute">
            <div>
              Thank you for showing interest in contributing to the project.
            </div>
            <div className="field">
              <div className="form-wrapper">
                <div className="field">
                  <label className="label">
                    Which country did you travel to?
                  </label>

                  <div className="control">
                    <div className="select contribute-btn">
                      <select
                        name="country"
                        value={country}
                        onChange={this.handleChange}
                        required
                      >
                        <option>Pick Country</option>
                        {countries.map((el, i) => (
                          <option key={i}>{el}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">
                    What kind of trip did you take?
                  </label>
                  <div className="control">
                    <div className="select contribute-btn">
                      <select
                        name="kindOfTrip"
                        value={kindOfTrip}
                        onChange={this.handleChange}
                        required
                      >
                        <option>Kind of Trip</option>
                        {tripDetails.map((el, i) => (
                          <option key={i}>{el}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="control">
                <label className="checkbox parallel">
                  <input
                    type="checkbox"
                    className="terms"
                    checked={terms}
                    name="terms"
                    onChange={this.handleToggle}
                    required
                  />
                  <div className="terms">
                    I agree to the <Link to="#">terms and conditions</Link>
                  </div>
                </label>
              </div>
            </div>
            {!country || !terms || !kindOfTrip ? (
              <button className="button is-danger">Choose country</button>
            ) : (
              <Link
                to="/form"
                className="button is-primary"
                onClick={this.handleSubmit}
              >
                Continue
              </Link>
            )}
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User,
  };
}

export default withRouter(connect(mapStateToProps)(Contribute));
