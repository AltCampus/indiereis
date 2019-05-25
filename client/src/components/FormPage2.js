import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import {connect} from 'react-redux';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];

class FormPage2 extends React.Component{

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		console.log(this.props, 'props form2')

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="30" max="100">30%</progress>
					{questions.data && questions.country ? questions.data.qset2.slice(0,5).map((q,i) => 
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
					<Link to="/form/page3" className="button is-primary">Next</Link>
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

export default connect(mapStateToProps)(FormPage2);																														