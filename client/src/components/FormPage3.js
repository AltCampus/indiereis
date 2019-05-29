import React from 'react';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import FormPage4 from './FormPage4';
import { URL, num } from '../utils/static';

class FormPage3 extends React.Component{
	constructor(){
		super()
		this.state={
			nextFormPage: false
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_FORM3",
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
			{ !nextFormPage ?
				(
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="50" max="100">50%</progress>
					{questions.data && userFormData ? questions.data.qset2.questions.slice(5,10).map((q,i) => 
						<div key={i} className="field">
						  <label className="label">
							  {
							  	q.includes("COUNTRYNAME") ? q.replace( "COUNTRYNAME", userFormData.country ) : 
							  	q.includes("{I/WE}") && userFormData.kindOfTrip === "Solo" ? q.replace("{I/WE}", "I") :
							  	q.includes("{I/WE}") && userFormData.kindOfTrip !== "Solo" ? q.replace("{I/WE}", "We"): q
							  }
						  </label>
						  <div className="control" key={i}>
						    <div className="select">
						      <select onChange={this.handleChange} name={ questions.data.qset2.name.slice(5,10)[i]}>
						        <option>Ratings</option>
						          {num.map(i => <option>{i}</option>)}
						      </select>
						    </div>
						  </div>
						</div>
						): ''}
					<button className="button is-primary" onClick={this.handleSubmit}>Next</button>
				</div>
				): <FormPage4 />
			}
			</React.Fragment>
			)
	}
}

function mapStateToProps(state){
	console.log(state, 'inside map form3.....')
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage3);						