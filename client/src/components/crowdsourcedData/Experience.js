import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
class Experience extends React.Component{

	goBack = () => {
		this.props.history.push('/Dashboard')
	}

	render(){
		var country = this.props.country;
		
		return(
			<React.Fragment>
				{
					country && typeof(country) === "object" ? 
						Object.keys(country).filter( v => v === "trip experience" ).map((key, i) => 
							<div key={i} style={{ padding :'5px 0', display:'flex', justifyContent:'space-between'}}>
								 <p style={{ fontSize:'16px', fontWeight:'bold'}}>{key.toUpperCase()}</p>
								 <p style={{ fontSize:'14px', fontWeight:'bold'}}>{ country[key] }</p>
							</div>
						)
					: this.goBack()
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state){
	return{
    country: state.Country.countryName,
	}
}

export default withRouter(connect(mapStateToProps)(Experience));



