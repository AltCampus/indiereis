import React, { Component } from 'react';
import { URL } from '../utils/static';
import {connect} from 'react-redux';
import CountryModal from './CountryModal';
import {Link, withRouter} from 'react-router-dom';
import UserDash from './UserDash';
import NavBar from './NavBar';
import Footer from "./Footer";

class CountryInfo extends Component {
	
	render() {
		const { filteredCountry } = this.props.scrappedCountries || null ;
		console.log(filteredCountry, "inside CountryInfo.....");
		return (
			<React.Fragment>
				<NavBar />
				<UserDash />
					{
						filteredCountry ? 
							<div className ="country-container" /*onClick={() => this.searchCountry(filteredCountry.name)}*/>
								<div className="container-main">
									<div className="visa-head">
										<div className="container-head">
											<img src={ filteredCountry.flag } alt="flag" />
												<p>{filteredCountry.name}</p>
										</div>
									<p className="visa-btn">{filteredCountry.Visa_Requirement}</p>
									</div>
									<p className="country-notes">{filteredCountry.notes}</p>
								</div>
							</div>
						: "no filteredCountry..."
					}
				<Footer />
			</React.Fragment>
		);
	}
}

function mapStateToProps(state){
	return {
		scrappedCountries: state.Country,
	}
}

export default withRouter(connect(mapStateToProps)(CountryInfo));
