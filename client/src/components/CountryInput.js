import React, {Component} from 'react';

class CountryInput extends React.Component {
	render() {
		return(
			<div className="country-input hero">
				<div>
					<input type="text" placeholder="Where do you want to go today?" name="countryinput"/>
				</div>
			</div>
		)
	}
}

export default CountryInput;