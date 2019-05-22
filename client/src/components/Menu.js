import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Menu extends React.Component {
	render() {
		return(
			<React.Fragment>
				<div className="menu">
					<div className="menu-items">
						<Link to="/">Logo</Link>
						<Link to="/map">Map</Link>
						<Link to="/contribute">Contribute</Link>
						<Link to="/login">SignIn</Link>
						<Link to="/signup">SignUp</Link>
						<Link to="/about">About</Link>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Menu;