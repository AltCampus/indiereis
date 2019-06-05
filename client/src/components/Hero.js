import React from "react";
import { Link, withRouter } from "react-router-dom";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="hero">
        <div className="hero-text">
          <p>subjective indian travel guide</p>
          <hr />
        </div>
        <div className="hero-sub-text">
          <Link to="/discover" className="btn-standard">Discover</Link>
          <Link to= "/contribute" className="btn-standard">Contribute</Link>
        </div>
        <div className="hero-info">
          <p>
            Ever thought about what it would be like to travel to another
            country without worrying about the tiresome process of researching
            on all the travel info? This website is developed keeping in mind
            the requirements of an average Indian traveler visiting a foreign
            country. Want to know more?
            <small>
              <Link to="/about">Read here</Link>
            </small>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
