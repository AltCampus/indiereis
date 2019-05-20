import React, {Component} from 'react';

class Menu extends React.Component {
	render() {
		return(
			<React.Fragment>
				<div className="menu">
					<div className="menu-items">
						<a href="">Logo</a>
						<a href="">Map</a>
						<a href="">Contribute</a>
						<a href="">Login</a>
						<a href="">SignUp</a>
						<a href="">About</a>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Menu;