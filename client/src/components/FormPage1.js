import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];
const countries = ['Thailand','Japan','Singapore','Malaysia','Indonesia','Bhutan','China','Vietnam','Nepal', 'Australia', 'Myanmar', 'HongKong','Cambodia'];
const kindOfTrip = ['Solo', 'Couple', 'Family', 'Group', 'Company Trip'];
const suitedTrip = ['Solo Travelers/Backpackers', 'Couples', 'Families', 'Groups', 'Any kind of trip'];
const idealHoliday= ['City Hopping', 'Beach Bumming', 'Adventure', 'Leisure', 'Road Trip', 'Nature']
class FormPage1 extends React.Component{
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
					<progress className="progress is-primary" value="15" max="100">15%</progress>
					{this.state.questions ? (
						<div>
							<div className="field">
							  <label className="label">{this.state.questions.qset3[0]}</label>
							  <div className="control">
							    <div className="select">
							      <select>
							        <option>Pick Country</option>
							        {countries.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							    </div>
							  </div>
							</div>

							<div className="field">
							  <label className="label">{this.state.questions.qset3[1]}</label>
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
							  <label className="label">{this.state.questions.qset3[2]}</label>
							  <div className="control">
							    <input className="input" placeholder="No. of days" type="text" />
							  </div>
							</div>

							<div className="field">
								<label className="label">{this.state.questions.qset3[3]}</label>
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
								<label className="label">{this.state.questions.qset3[4]}</label>
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

						): ''}

					<Link to="/form/page2" className="button is-primary">Next</Link>
				</div>
			</React.Fragment>
			)
	}
}


export default FormPage1;						