import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FormPage6 from './FormPage6';
import { URL, num } from '../utils/static';

class FormPage5 extends React.Component{
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
	      type:"ADD_FORM5",
	      data: this.state
	    })
	    this.setState({
	    	nextFormPage: !this.state.nextFormPage	
	    });
		}else {console.log("state is empty")}
	}

	render(){
		const {nextFormPage} = this.state;
		const questions = this.props.questions ? this.props.questions.Questions : null;
		const userFormData = this.props.questions  ? this.props.questions.userFormData.countaryAndTrip : null;

		return(
			<React.Fragment>
			{ questions.data ?  
			 !nextFormPage ?
				(<div className= "form-wrapper">
					<progress className="progress is-primary" value="95" max="100">95%</progress>
					{questions.data ? questions.data.qset1.questions.map((q,i) => 
						<div key={i} className="field">
						  <label className="label">
						  {
						  	q.includes("COUNTRYNAME") ? q.replace( "COUNTRYNAME", userFormData.country ) : 
						  	q.includes("{I/WE}") && userFormData.kindOfTrip === "Solo" ?
						  	q.replace("{I/WE}", "I") :
						  	q.includes("{I/WE}") && userFormData.kindOfTrip !== "Solo" ?
						    q.replace("{I/WE}", "we"): q
						  }
						  </label>
						  <div className="control">
						    <input className="input" type="text" onChange={this.handleChange} name={ questions.data.qset1.name[i] } required/>
						  </div>
						</div>
					) : ''}
					<button className="button is-primary" onClick={this.handleSubmit}>Next</button>
				</div>
				): <FormPage6 />
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

export default connect(mapStateToProps)(FormPage5);																														