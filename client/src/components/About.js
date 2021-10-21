import React from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import UserDash from "./UserDash";
import NavBar from "./NavBar";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <UserDash />
        <div className="about-main">
          <p className="about-info">More coming sooon!</p>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(About);
