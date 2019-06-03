import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class NavBar extends React.Component {

	handleLogout = e => {
		console.log("cleared localStorage");
		this.props.dispatch({
			type: "LOGOUT"
		});
		window.localStorage.clear();
		this.props.history.push("/login");
	};

	render() {
		return ( 
			<React.Fragment >
				<nav className = "navbar is-link is-small" role=" navigation " aria-label="main navigation"> 
					<div className = "navbar-brand">
						<Link to = "/" className = "navbar-item">Indiereis</Link> 
					</div>

					<div id = "navbarBasicExample"className = "navbar-menu">
						<div className = "navbar-start">
							<Link to = "/" className = "navbar-item">Home </Link>
							<div className = "navbar-item has-dropdown is-hoverable">
								<Link to = "#" className = "navbar-link">More </Link>
								<div className = "navbar-dropdown">
									<Link to = "/about" className = "navbar-item">About </Link> 
								</div> 
							</div> 
						</div>

						<div className = "navbar-end">
							<div className = "navbar-item">
								<div className = "buttons"> 
									{!this.props.loggeduser ? 
									( 
										<div>		
											<Link to = "/signup" className = "button is-primary">
											<strong > Sign up </strong></Link>
											<Link to = "/login" className = "button is-light">Log in </Link>
										</div>
									) : 
									( 
										<Link type = "submit" className = "button is-light is-small" onClick = {this.handleLogout}> Logout </Link>
									)
									}
								</div> 
							</div> 
						</div> 
					</div>
				</nav> 
			</React.Fragment>
			)
		}
	}

	function mapStateToProps(state) {
		return {
			loggeduser: state.User.user
		}
	}
	
export default withRouter(connect(mapStateToProps)(NavBar));
