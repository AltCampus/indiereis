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

  handleCountry = (country) => {
  	console.log(country, 'form-country')
  	this.props.dispatch({
  		type: 'COUNTRY_NAME',
  		countryName: country
  	})
  }

	render(){

		const data = this.props.crowdsourced ? this.props.crowdsourced.data : null;
		// console.log(data)

		return(
				<div>
					<div style={{width: '800px', margin: '0 auto'}}>
						<h2 style={{textAlign:'left', marginTop: '40px'}}>Below are the countries for which you have contributed</h2>
					</div>
					<div className="dash-flex">
		        <UserProfile />
						<div className="wrapper">
							<div className="main-grid">
							{ this.props.crowdsourced ? data.map((d, i) => 
								<Link to={'/'+d.country}><div key={i} onClick={() => this.handleCountry(d.country)} className="big-box bg1">{d.country}</div></Link>
								) : null
							}
							</div>
						</div>
					</div>
				</div>
					)
			}
}

function mapStateToProps(state){
	console.log(state, "crd")
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default withRouter(connect(mapStateToProps)(SourcedForm));