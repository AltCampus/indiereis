import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import {connect} from 'react-redux';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];

class FormPage2 extends React.Component{

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
	    this.setState({});
		}else {console.log("state is empty")}
	}
	
	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		console.log(this.props, 'props form2')

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="30" max="100">30%</progress>
					{questions.data ? questions.data.qset2.questions.slice(0,5).map((q,i) => 
						<div key={i} className="field">
						  <label className="label">{q}</label>
						  <div className="control">
						    <div className="select">
						      <select onChange={this.handleChange} name={ questions.data.qset2.name.slice(0,5)[i] } >
						        <option>Ratings</option>
						          {num.map(i => <option>{i}</option>)}
						      </select>
						    </div>
						  </div>
						</div>
						): ''}
					<Link to="/form/page3" className="button is-primary" onClick={this.handleSubmit}>Next</Link>
				</div>
			</React.Fragment>
			)
	}
}
function mapStateToProps(state){
	console.log(state, 'inside map form2.....')
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage2);																														