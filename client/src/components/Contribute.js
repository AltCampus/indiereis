import React from 'react';
import FormPage1 from './FormPage1';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link, withRouter } from "react-router-dom";

class Contribute extends React.Component{
	render(){
		return(
			<div>
				<NavBar />
				<div className="is-small contribute">
					<div>Thank you for showing interest in contributing to the project.</div>
					<div className="field">
						  <div className="control">
						    <label className="checkbox parallel" >
						      <input type="checkbox" className="terms" />
						      <div className="terms">I agree to the <Link to="#">terms and conditions</Link></div>
						    </label>
						  </div>
						</div>
					<Link to="/form/page1" className="button is-primary">Continue</Link>
				</div>
				<Footer />
			</div>
		)
	}
}

export default Contribute;

