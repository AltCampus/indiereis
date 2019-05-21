import React, {Component} from 'react';

class CountryInput extends React.Component {
	render() {
		return(
			<div className="country-input hero">
				<input type="text" placeholder="Where do you want to go today?" name="countryinput"/>
			</div>
		)
	}
}

export default CountryInput;