import React from 'react';
import {connect} from 'react-redux';
var storeKey = [];

class Experience extends React.Component{

	render(){
		const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
		const ratingInfo = crowdsourced.data.slice(0,1)[0]

		return (
			<div>
				<div className=''>
				{ 
					Object.keys(ratingInfo).map((key, i) => {
						key.includes("trip experience") ? storeKey[key]= ratingInfo[key] : ''
					})
				}
				{
					crowdsourced ? Object.keys(storeKey).map((key, i) => 
					<div key={i}>
						<p style={{ fontSize:'16px', fontWeight:'bold' }}>{key.toUpperCase()}</p>
						<p style={{ fontSize:'14px', fontWeight:'bold' }}>{ ratingInfo[key] }</p>
					</div> ) : null 
				}
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

export default connect(mapStateToProps)(Experience);



