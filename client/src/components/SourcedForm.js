import React from 'react';
import UserProfile from './userProfile';
import CountryProfile from './CountryProfile';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";


class SourcedForm extends React.Component{
	render(){
		return(
				<div>
					<div style={{width: '800px', margin: '0 auto'}}>
						<h2 style={{textAlign:'left', marginTop: '40px'}}>Below are the countries for which you have contributed</h2>
					</div>
					<div className="dash-flex">
		        <UserProfile />
						<div class="wrapper">
							<div className="main-grid">
								<Route>
								<Link to="/country-profile"><div className="big-box bg1">Malaysia</div></Link>
								<div className="box bc2">Japan</div>
								<div className="box bg3">Korea</div>
								</Route>
							</div>
						</div>
					</div>
				</div>
					)
			}
}

export default SourcedForm;