import React from 'react';
import {connect} from 'react-redux';
import SourcedForm from '../SourcedForm';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

class General extends React.Component{

	goBack = () => {
		console.log(this.props)
		this.props.history.push('/Dashboard')
	}

	render(){
		const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
		const ratingInfo = crowdsourced.data
		const countryName = this.props.countryName
		// console.log(ratingInfo)

		return(
				<React.Fragment>
					{countryName ?
					crowdsourced  ? ratingInfo.filter((val, i) => val.country === countryName).map((filteredCountry, j) => Object.keys(filteredCountry).map((key, i) => 
						<div key={i}>
							<p>{key}</p>
							<progress className="progress is-primary" value={filteredCountry[key]} max="10">{filteredCountry[key]}</progress>
						</div>
							))
					: null
					: this.goBack()
					}

				</React.Fragment>
			)
	}
}

function mapStateToProps(state){
	console.log(state)
	return{
    crowdsourced: state.Crowdsourced.data,
    countryName: state.Crowdsourced.country
	}
}

export default withRouter(connect(mapStateToProps)(General));