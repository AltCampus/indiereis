import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import ListCountry from "./ListCountry";
import UserDash from "./UserDash";
import NavBar from "./NavBar";

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

export default Home;
