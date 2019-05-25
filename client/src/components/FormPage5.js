import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";

class FormPage5 extends React.Component{

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;

		return(
			<React.Fragment>
				<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="95" max="100">95%</progress>
					{questions.data && questions.country ? questions.data.qset1.map((q,i) => 
						<div key={i} className="field">
						  <label className="label">{q}</label>
						  <div className="control">
						    <input className="input" type="text" required/>
						  </div>
						</div>
					) : ''}
					<Link to="/form/page6" className="button is-primary">Next -></Link>
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

export default connect(mapStateToProps)(FormPage5);																														