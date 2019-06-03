import React from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import load from 'load-script';

class Flights extends React.Component{

	componentDidMount() {
		load("https://widgets.skyscanner.net/widget-server/js/loader.js");
	}

	render(){
		return(
			<div>
				<h2>You're in flight info section.</h2>
				<div className="flight-container">
				<meta name="originLocation" />
					<div data-skyscanner-widget="FlightSearchWidget" data-locale="en-GB"></div>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default connect(mapStateToProps)(Flights);

