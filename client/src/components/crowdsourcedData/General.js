import React from 'react';
import {connect} from 'react-redux';
import SourcedForm from '../SourcedForm';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

class General extends React.Component{

	goBack = () => {
		this.props.history.push('/Dashboard')
	}

	render(){
		const crowdsourced = this.props.crowdsourced ? this.props.crowdsourced : null;
		const ratingInfo = crowdsourced.data
		const countryName = this.props.countryName
		
		return(
			<React.Fragment>
				{
					countryName ?
					crowdsourced  ? ratingInfo.filter((val, i) => val.country === countryName).map((country, index) => Object.keys(country).filter(v => v !== "userId" && v !== "__v" && v !== "_id" && v !== "createdAt" && v !== "updatedAt" && "trip experience").map((key, i) =>
					<div key={i}>
						{	
							country[key].toString().length == 1 || country[key].toString() === "10" ?
							<div style={{ padding :'5px 0'}}>
								<div style={{ display:'flex', justifyContent:'space-between', padding :'0 0 5px 0 '}}>
									<p style={{ fontSize:'16px', fontWeight:'bold' }}>{key.toUpperCase()}</p>
									<p style={{ fontSize:'14px', fontWeight:'bold' }}>{ (Number(country[key])/10)*100 } %</p>
								</div>
								<progress className="progress is-primary" value={country[key]} max="10">{country[key]}</progress>
							</div>
							:
							<div style={{ padding :'5px 0', display:'flex', justifyContent:'space-between'}}>
								 <p style={{ fontSize:'16px', fontWeight:'bold'}}>{key.toUpperCase()}</p>
								 <p style={{ fontSize:'14px', fontWeight:'bold'}}>{ country[key] }</p>
							</div>
						}
					</div> )) : null
					: this.goBack()
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state){
	return{
    crowdsourced: state.Crowdsourced.data,
    countryName: state.Crowdsourced.country
	}
}

export default withRouter(connect(mapStateToProps)(General));