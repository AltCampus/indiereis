import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";

// var options = {
// 	bg: '#fc3bec',
// 	target: document.getElementById('myDivId'),
// 	id: 'progressbar'
// }
// var nanobar = new Nanobar( options );

// <div id="progressbar">{nanobar.go(20)}</div>

class FormPage5 extends React.Component{
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
					<progress className="progress is-primary" value="95" max="100">95%</progress>
					{this.state.questions ? this.state.questions.qset1.map((q,i) => 
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


export default FormPage5;																														