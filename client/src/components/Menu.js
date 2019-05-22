import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';

class Menu extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}

	handleLogout = (e) => {
		console.log('cleared localStorage')
		this.props.history.push('/')
		window.localStorage.clear()
	}

	render() {
		return(
			<React.Fragment>
			 { 
			 	this.props.loggeduser ? 
				<div className="menu">
					<div className="menu-items">
						<Link to="/">Logo</Link>
						<Link to="/map">Map</Link>
						<Link to="/contribute">Contribute</Link>
						<Link to="/dashboard">Dashboard</Link>
						<button type="submit" onClick={this.handleLogout}> Logout</button>
					</div>
				</div>
			:
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
			}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		loggeduser: state.User.user
	}
}

export default connect(mapStateToProps)(Menu);