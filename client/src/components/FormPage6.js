import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";

class FormPage6 extends React.Component{
	constructor(){
		super();
		this.state = {
			questions: '',
		}
	}

	componentDidMount = () => {
		fetch(`${URL}/questions`).then(res => res.json()).then(d => this.setState({
			questions: d.data[0]
		}));
	}

	render(){
		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="100" max="100">100%</progress>
					{this.state.questions ? 
					<div className="field">
					  <label className="label">{this.state.questions.qset4[0]}</label>
					  <div className="control">
					    <textarea className="textarea" placeholder="200 characters minimum"></textarea>
					  </div>
					</div>
						: ''}
					<Link to="/submit" className="button is-primary">Submit</Link>
				</div>
			</React.Fragment>
			)
	}
}


export default FormPage6;																														