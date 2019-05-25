import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = () => {
  return (
    <div className="foot">
      <nav className="navbar footer-items">
        <Link to="/">Contact</Link>
        <Link to="#">Github</Link>
        <Link to="#">Sitemap</Link>
      </nav>
    </div>	
  );
};

export default Footer;
