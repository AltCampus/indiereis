import React from 'react';
import {BrowserRouter as Router,Route,Switch,withRouter, Link} from "react-router-dom";
import SourcedForm from './SourcedForm';

class UserProfile extends React.Component{
	render(){
		return(
			<div>
				<div className="side-menu-items">
					<div className=""></div>
					<ul className="">
						<li><Link to="/profile">Profile</Link></li>
						<li><Link to="/contribute">Contribute</Link></li>
					  <li><Link to="/disocver">Discover</Link></li>
					  <li><Link to="/about">About</Link></li>
					</ul>
				</div>
			</div>
			)
	}
}

export default UserProfile;