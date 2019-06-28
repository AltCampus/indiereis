import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Visa extends React.Component{
	
	goBack = () => {
		this.props.history.push('/Dashboard')
	}

	render(){
		var country = this.props.country;

		return(
			<React.Fragment>
				{
					country && typeof(country) === "object" ? 
						Object.keys(country).filter( v => v.includes("visa")).map((key, i) => 
								country[key].toString().length === 1 || country[key].toString() === "10" ?
									<div key={i} style={{ padding :'5px 0'}}>
										<div style={{ display:'flex', justifyContent:'space-between', padding :'0 0 5px 0 '}}>
											<p style={{ fontSize:'16px', fontWeight:'bold' }}>{key.toUpperCase()}</p>
											<p style={{ fontSize:'14px', fontWeight:'bold' }}>{ (Number(country[key])/10)*100 } %</p>
										</div>
										<progress className="progress is-primary" value={country[key]} max="10">{country[key]}</progress>
									</div>
									:
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

export default withRouter(connect(mapStateToProps)(Visa));
