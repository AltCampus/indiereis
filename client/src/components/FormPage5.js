import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";

class FormPage5 extends React.Component{

	handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_USER_DATA",
	      data: this.state
	    })
	    this.setState({});
		}else {console.log("state is empty")}
	}

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;

		return(
			<React.Fragment>
				<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="95" max="100">95%</progress>
					{questions.data && questions[0].country && questions[0].kindOfTrip ? questions.data.qset1.questions.map((q,i) => 
						<div key={i} className="field">
						  <label className="label">{q}</label>
						  <div className="control">
						    <input className="input" type="text" onChange={this.handleChange} name={ questions.data.qset1.name[i] } required/>
						  </div>
						</div>
					) : ''}
					<Link to="/form/page6" className="button is-primary" onClick={this.handleSubmit}>Next -></Link>
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