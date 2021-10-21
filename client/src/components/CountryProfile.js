import React from "react";
import UserProfile from "./UserProfile";
import Tabs from "./Tabs";
import UserDash from "./UserDash";
import NavBar from "./NavBar";

class CountryProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <UserDash />
        <div className="dash-flex" style={{ marginTop: "40px" }}>
          <UserProfile />
          <Tabs />
        </div>
      </React.Fragment>
    );
  }
}

export default CountryProfile;
