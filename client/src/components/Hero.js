import React from "react";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="hero">
        <div className="hero-text">
          <p>subjective indian travel guide</p>
          <hr />
        </div>
        <div className="hero-sub-text">
          <button className="btn-standard">Discover</button>
          <button className="btn-standard">Contribute</button>
        </div>
        <div className="hero-info">
          <p>
            Ever thought about what it would be like to travel to another
            country without worrying about the tiresome process of researching
            on all the travel info? This website is developed keeping in mind
            the requirements of an average Indian traveler visiting a foreign
            country. Want to know more?{" "}
            <small>
              <a href="/">Read here</a>
            </small>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
