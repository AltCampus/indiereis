import React from 'react';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import FormPage3 from './FormPage3';
import { URL, num } from '../utils/static';

class FormPage2 extends React.Component{
	constructor(){
		super()
		this.state={
			nextFormPage: false
		}
	}

	goBack = () => {
		this.props.history.push('/contribute');
	}

	handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_FORM2",
	      data: this.state
	    })
	    this.setState({
	    	nextFormPage: !this.state.nextFormPage	
	    });
		}else {console.log("state is empty")}
	}
	
	render(){
		const {nextFormPage} = this.state
		const questions = this.props.questions ? this.props.questions.Questions : null;
		const userFormData = this.props.questions  ? this.props.questions.userFormData.countaryAndTrip : null;

		return(
			<React.Fragment>
				{ questions.data && userFormData ?
					!nextFormPage ?
						(
						<div className= "form-wrapper">
							<progress className="progress is-primary" value="30" max="100">30%</progress>
							{questions.data && userFormData ? questions.data.qset2.questions.slice(0,5).map((q,i) => 
								<div key={i} className="field">
								  <label className="label">
								  { 
								  	q.includes("COUNTRYNAME") ? q.replace( "COUNTRYNAME", userFormData.country ) :
								  	q.includes("{I/we}") && userFormData.kindOfTrip === "Solo" ?
								  	q.replace("{I/we}", "I") :
								  	q.includes("{I/we}") && userFormData.kindOfTrip !== "Solo" ?
								    q.replace("{I/we}", "we"): q
								  }
								  </label>
								  <div className="control">
								    <div className="select">
								      <select onChange={this.handleChange} name={ questions.data.qset2.name.slice(0,5)[i] } required >
								        <option>Ratings</option>
								          {num.map((v, i) => <option key={i}>{v}</option>)}
								      </select>
								    </div>
								  </div>
								</div>
								): ''}
							<button className="button is-primary" onClick={this.handleSubmit}>Next</button>
						</div>
						): <FormPage3 />
					: this.goBack()
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state){
	return {
		questions: state
	}
}

export default withRouter(connect(mapStateToProps)(FormPage2));																														