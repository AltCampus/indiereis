import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavBar from './NavBar';
import {connect} from 'react-redux';

const URL = "http://localhost:8000/api/v1";
var num = [1,2,3,4,5,6,7,8,9,10];
const countries = ['Thailand','Japan','Singapore','Malaysia','Indonesia','Bhutan','China','Vietnam','Nepal', 'Australia', 'Myanmar', 'HongKong','Cambodia'];
const suitedTrip = ['Solo Travelers/Backpackers', 'Couples', 'Families', 'Groups', 'Any kind of trip'];
const idealHoliday= ['City Hopping', 'Beach Bumming', 'Adventure', 'Leisure', 'Road Trip', 'Nature']

class FormPage1 extends React.Component{
	
	componentDidMount(){
		fetch(`${URL}/questions`).then(res => res.json()).then(d => {
			// console.log(d, 'inside cdm.....')
			this.props.dispatch({
				type: 'ADD_QUESTIONS',
				data: d.data[0]
			});
		})
	}

		handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_FORM1",
	      data: this.state
	    })
	    this.setState({});
		}else {console.log("state is empty")}
	}

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		const userFormData = this.props.questions  ? this.props.questions.userFormData.countaryAndTrip : null;
		// console.log(this.props, 'props.....f1')
		// console.log(userFormData, questions.data, "questions in page1......");

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="10" max="100">10%</progress>
					{questions.data && userFormData ? (
						<div>
							<div className="field">
							  <label className="label">
								  { 
								  	questions.data.qset3.questions[0].includes("COUNTRYNAME") ? questions.data.qset3.questions[0].replace( "COUNTRYNAME", userFormData.country ) : questions.data.qset3.questions[0] 
									}
							  </label>
							  <div className="control">
							    <input className="input" onChange={this.handleChange} placeholder="No. of days" type="text" name={ questions.data.qset3.name[0] } required/>
							  </div>
							</div>

							<div className="field">
								<label className="label">
									{
										questions.data.qset3.questions[2].includes("COUNTRYNAME") ? questions.data.qset3.questions[2].replace( "COUNTRYNAME", userFormData.country ) : questions.data.qset3.questions[2]
									}
								</label>
							  <div className="control">
							    <div className="select">
							      <select name={ questions.data.qset3.name[2] } onChange={this.handleChange} required >
							        <option>Choice of Trip</option>
							        {suitedTrip.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							   	</div>
								</div>
							</div>
							
							<div className="field">
								<label className="label">
									{
										questions.data.qset3.questions[1].includes("COUNTRYNAME") ? questions.data.qset3.questions[1].replace( "COUNTRYNAME", userFormData.country ) : questions.data.qset3.questions[1] 
									}
								</label>
							  <div className="control">
							    <div className="select">
							      <select name={ questions.data.qset3.name[1] } onChange={this.handleChange} required >
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

					<Link to="/form/page2" className="button is-primary" onClick={this.handleSubmit} >Next</Link>
				</div>
			</React.Fragment>
			)
	}
}

function mapStateToProps(state) {
	// console.log(state, 'inside map form1.....')
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage1);						