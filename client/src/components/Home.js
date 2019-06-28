import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import ListCountry from "./ListCountry";
import { connect } from "react-redux";
import UserDash from './UserDash';
import NavBar from './NavBar';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <UserDash />
        <Hero />
        <ListCountry />
        <Footer />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sata: state
  }
}
export default connect(mapStateToProps)(Home);
