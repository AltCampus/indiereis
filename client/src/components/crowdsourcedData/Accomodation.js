import React from 'react';
import {connect} from 'react-redux';

class Accomodation extends React.Component{
	render(){
		return(
			<div>
				<h2>You're in Accomodation info section.</h2>
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

export default connect(mapStateToProps)(Accomodation);

