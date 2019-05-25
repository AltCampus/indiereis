import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import { connect } from "react-redux";


const URL = "http://localhost:8000/api/v1";

class FormPage6 extends React.Component{

	render(){

		const questions = this.props.questions ? this.props.questions.Questions : null;

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="100" max="100">100%</progress>
					{questions.data && questions.country ? 
					<div className="field">
					  <label className="label">{questions.data.qset4[0]}</label>
					  <div className="control">
					    <textarea className="textarea" placeholder="200 characters minimum"></textarea>
					  </div>
					</div>
						: ''}
					<Link to="/dashboard" className="button is-primary">Submit</Link>
				</div>
			</React.Fragment>
			)
	}
}

function mapStateToProps(state){
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage6);																														