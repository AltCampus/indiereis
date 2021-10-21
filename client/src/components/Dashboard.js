import React from "react";
import Footer from "./Footer";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import SourcedForm from "./SourcedForm";
import UserDash from "./UserDash";
import NavBar from "./NavBar";

class Dashboard extends React.Component {
  render() {
    const user = this.props.loggeduser ? this.props.loggeduser.user : "";

    return (
      <div>
        <NavBar />
        <UserDash />
        <SourcedForm />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User.user,
    crowdsourced: state,
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
