import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];

class FormPage3 extends React.Component{
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
					<progress className="progress is-primary" value="60" max="100">60%</progress>
					{this.state.questions ? this.state.questions.qset2.slice(5,10).map((q,i) => 
						<div key={i} className="field">
						  <label className="label">{q}</label>
						  <div className="control">
						    <div className="select">
						      <select>
						        <option>Ratings</option>
						          {num.map(i => <option>{i}</option>)}
						      </select>
						    </div>
						  </div>
						</div>
						): ''}
					<Link to="/form/page4" className="button is-primary">Next</Link>
				</div>
			</React.Fragment>
			)
	}
}


export default FormPage3;						