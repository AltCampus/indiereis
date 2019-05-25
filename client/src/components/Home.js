import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import ListCountry from "./ListCountry";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Hero />
        <ListCountry />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
