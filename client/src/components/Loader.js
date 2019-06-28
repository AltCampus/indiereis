import React, { Component } from 'react';

export default class Loader extends Component {
	render() {
		return (
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
}
