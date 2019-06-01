import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import ListCountry from "./ListCountry";
import { connect } from "react-redux";

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
const mapStateToProps = (state) => {
  return {
    sata: state
  }
}
export default connect(mapStateToProps)(Home);
