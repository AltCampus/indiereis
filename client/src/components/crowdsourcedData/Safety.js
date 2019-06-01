import React from 'react';
import {connect} from 'react-redux';

class Safety extends React.Component{
	render(){
		return(
			<div>
				<h2>You're in Safety info section.</h2>
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default connect(mapStateToProps)(Safety);

