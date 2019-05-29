import React from 'react';
import {connect} from 'react-redux';

class Experience extends React.Component{
	render(){
		return(
			<div>
				<h2>You're in Experience info section.</h2>
			</div>
			)
	}
}

function mapStateToProps(state){
	console.log(state)
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default connect(mapStateToProps)(Experience);



