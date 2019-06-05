	import React from 'react';
	import {connect} from 'react-redux';
	var storeKey = [];

	class Visa extends React.Component{
		render(){
			const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
			const ratingInfo = crowdsourced.data.slice(0,1)[0]

			return(
				<div>
					<div className="">
						{ 
							Object.keys(ratingInfo).map((key, i) => {
								key.includes('visa') ? storeKey[key]= ratingInfo[key] : 'hello'
							})
						}
						{
							crowdsourced ? Object.keys(storeKey).map((key, i) => 
							<div key={i}>
								<div style={{ display:'flex', justifyContent:'space-between', padding :'0 0 5px 0 '}}>
									<p style={{ fontSize:'16px', fontWeight:'bold' }}>{ key.toUpperCase() }</p>
									<p style={{ fontSize:'14px', fontWeight:'bold' }}>{ ratingInfo[key] } </p>
								</div>
								{/*<progress className="progress is-primary" value={ratingInfo[key]} max="10">{ratingInfo[key]}</progress>*/}
							</div> ): null
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

	export default connect(mapStateToProps)(Visa);