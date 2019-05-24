import React from 'react';
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component{
	render(){
		return(
			<React.Fragment>
				<nav className="navbar is-link
" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item" href="">
							Logo
						</Link>
					</div>

					<div id="navbarBasicExample" className="navbar-menu">
						<div className="navbar-start">
							<Link to="/" className="navbar-item">
							Home
							</Link>

							<Link to ="#" className="navbar-item">
							Documentation
							</Link>

							<div className="navbar-item has-dropdown is-hoverable">
							<Link to="#" className="navbar-link">
								More
							</Link>

							<div className="navbar-dropdown">
								<Link to = "/about" className="navbar-item">
									About
								</Link>
							</div>
						</div>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<Link to ="/signup" className="button is-primary">
									<strong>Sign up</strong>
								</Link>
								<Link to ="/login" className="button is-light">
									Log in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</React.Fragment>
		)
	}
}

export default NavBar;

