import React from 'react';
import {connect} from 'react-redux';

class General extends React.Component{
	render(){
		const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
		const ratingInfo = crowdsourced.data.slice(0,1)[0]
		console.log(ratingInfo)

		return(
			<div>
				<React.Fragment>
					<h2>You're in General info section.</h2>
					<div className="">
						{crowdsourced ? Object.keys(ratingInfo).map((key, i) => 
							<div key={i}>
								<li>{key}:</li>
								<progress className="progress is-primary" value={ratingInfo[key]} max="10">{ratingInfo[key]}</progress>
							</div>
							)
						: null
						}
					</div>
				</React.Fragment>
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default connect(mapStateToProps)(General);