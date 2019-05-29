import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import { connect } from "react-redux";
import { sendData } from "../actions/User";

const URL = "http://localhost:8000/api/v1";

class FormPage6 extends React.Component{

	handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_FORM6",
	      data: this.state
	    })
	    sendData();
      this.props.history.push("/dashboard");
	    this.setState({});  
		}else {console.log("state is empty")}
	}

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		const userFormData = this.props.questions  ? this.props.questions.userFormData.countaryAndTrip : null;

		return(
			<React.Fragment>
				<NavBar />
					<div className= "form-wrapper">
						<progress className="progress is-primary" value="100" max="100">100%</progress>
						{ 
							questions.data ? 
							(
								<div className="field">
								  <label className="label">{ questions.data.qset4.questions}</label>
								  <div className="control">
								    <textarea className="textarea" placeholder="200 characters minimum" name={questions.data.qset4.name[0]} onChange={this.handleChange} >
								    </textarea>
								  </div>
								</div>
							)
							: <p>'no data'</p>
						}
						<Link to="/dashboard" className="button is-primary" onClick={this.handleSubmit}>Submit</Link>
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