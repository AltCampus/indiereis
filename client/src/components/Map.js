import React from "react";
import Iframe from "react-iframe";
import Header from "./Header";
import Footer from "./Footer";

class Map extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="embed-map">
          <Iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.38440773782!2d-3.819620993566547!3d40.43813108061874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C+Spain!5e0!3m2!1sen!2sin!4v1558508555570!5m2!1sen!2sin"
            width="600"
            height="450"
            frameborder="0"
            style="border:0"
            allowfullscreen
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Map;
