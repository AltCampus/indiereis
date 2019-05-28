import React from 'react';
import {connect} from 'react-redux';

class Visa extends React.Component{
	render(){
		return(
			<div>
				<h2>You're in Visa info section.</h2>
			</div>
			)
	}
}

function mapStateToProps(state){
	console.log(state)
	return{
		state
	}
}

export default connect(mapStateToProps)(Visa);