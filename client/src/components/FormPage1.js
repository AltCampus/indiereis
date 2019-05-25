import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import {connect} from 'react-redux';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];
const countries = ['Thailand','Japan','Singapore','Malaysia','Indonesia','Bhutan','China','Vietnam','Nepal', 'Australia', 'Myanmar', 'HongKong','Cambodia'];
const kindOfTrip = ['Solo', 'Couple', 'Family', 'Group', 'Company Trip'];
const suitedTrip = ['Solo Travelers/Backpackers', 'Couples', 'Families', 'Groups', 'Any kind of trip'];
const idealHoliday= ['City Hopping', 'Beach Bumming', 'Adventure', 'Leisure', 'Road Trip', 'Nature']

class FormPage1 extends React.Component{
	
	componentDidMount = () => {
		fetch(`${URL}/questions`).then(res => res.json()).then(d => {
			// console.log(d.data, 'inside cdm')
			this.props.dispatch({
				type: 'ADD_QUESTIONS',
				data: d.data[0]
		});
		})
	}

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		// console.log(this.props, 'props')
		// console.log(questions, 'qudiiu')

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="10" max="100">10%</progress>
					{questions.data && questions.country ? (
						<div>
							<div className="field">
							  <label className="label">{questions.data.qset3[1]}</label>
							  <div className="control">
							    <div className="select">
							      <select>
							        <option>Kind of Trip</option>
							        {kindOfTrip.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							    </div>
							  </div>
							</div>

							<div className="field">
							  <label className="label">{questions.data.qset3[2]}</label>
							  <div className="control">
							    <input className="input" placeholder="No. of days" type="text" />
							  </div>
							</div>

							<div className="field">
								<label className="label">{questions.data.qset3[3]}</label>
							  <div className="control">
							    <div className="select">
							      <select>
							        <option>Choice of Trip</option>
							        {suitedTrip.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							   	</div>
								</div>
							</div>

							<div className="field">
								<label className="label">{questions.data.qset3[4]}</label>
							  <div className="control">
							    <div className="select">
							      <select>
							        <option>Ideal Holiday</option>
							        {idealHoliday.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							   	</div>
								</div>
							</div>

							<div className="field">
							  <div className="control">
								</div>
							</div>

							</div>

						): <h1>Loading...</h1>}

					<Link to="/form/page2" className="button is-primary">Next</Link>
				</div>
			</React.Fragment>
			)
	}
}

function mapStateToProps(state) {
	// console.log(state, 'inside map')
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage1);						