import React from 'react';
import {BrowserRouter as Router,Route,Switch,withRouter, Link} from "react-router-dom";
import SourcedForm from './SourcedForm';
import MainProfile from './MainProfile';

class UserProfile extends React.Component{
	render(){
		return(
			<div>
				<div className="side-menu-items">
					<div className=""></div>
					<ul className="">
						<li><Link to="/user-profile">Profile</Link></li>
						<li><Link to="/contribute">Contribute</Link></li>
					  <li><Link to="/discover">Discover</Link></li>
					  <li><Link to="/about">About</Link></li>
					</ul>
				</div>
			</div>
			)
	}
}

export default UserProfile;