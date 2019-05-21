import React, {Component} from 'react';

class CountryInput extends React.Component {
	render() {
		return(
			<div className="country-input hero">
				<fieldarea>
					<input type="text" placeholder="Where do you want to go today?" name="countryinput"/>
				</fieldarea>
			</div>
		)
	}
}

export default CountryInput;