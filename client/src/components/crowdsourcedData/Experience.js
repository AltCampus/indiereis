import React from 'react';
import {connect} from 'react-redux';
var storeKey = [];

class Experience extends React.Component{

	render(){

		const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
		const ratingInfo = crowdsourced.data.slice(0,1)[0]

		return(
			<div>
				<div className=''>
				{ Object.keys(ratingInfo).map((key, i) => {
					key.includes('tripExperience') ? storeKey[key]= ratingInfo[key] : 'hello'
				} )
				}
				{crowdsourced ? Object.keys(storeKey).map((key, i) => 
					<div key={i}>
						{/*<p>{key}</p>*/}
						<p>{ratingInfo[key]}</p>
					</div>
					)
				:null 
				}
				</div>
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



