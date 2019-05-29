import React from 'react';
import UserProfile from './UserProfile';
import CountryProfile from './CountryProfile';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import {connect} from 'react-redux';


class SourcedForm extends React.Component{
  constructor(props) {
    super(props);
		this.state = {};
  }

	render(){

		return(
				<div>
					<div style={{width: '800px', margin: '0 auto'}}>
						<h2 style={{textAlign:'left', marginTop: '40px'}}>Below are the countries for which you have contributed</h2>
					</div>
					<div className="dash-flex">
		        <UserProfile />
						<div className="wrapper">
							<div className="main-grid">
								<Route>
								<Link to="/country-profile"><div className="big-box bg1">Malaysia</div></Link>
								</Route>
							</div>
						</div>
					</div>
				</div>
					)
			}
}

function mapStateToProps(state){
	return{
    crowdsourced: state
	}
}

export default withRouter(connect(mapStateToProps)(SourcedForm));