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
	
	componentDidMount = () => {
		fetch(`${URL}/questions`).then(res => res.json()).then(d => {
			// console.log(d.data, 'inside cdm')
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
	      type:"ADD_USER_DATA",
	      data1: this.state
	    })
	    this.setState({});
		}else {console.log("state is empty")}
	}

	render(){
		const questions = this.props.questions ? this.props.questions.Questions : null;
		// console.log(this.props, 'props')
		// console.log(questions, 'questions in page1', questions.data)

		return(
			<React.Fragment>
			<NavBar />
				<div className= "form-wrapper">
					<progress className="progress is-primary" value="10" max="100">10%</progress>
					{questions.data && questions[0].country && questions[0].kindOfTrip  ? (
						<div>
							<div className="field">
							  <label className="label">{ questions.data.qset3.questions[2] }</label>
							  <div className="control">
							    <input className="input" onChange={this.handleChange} placeholder="No. of days" type="text" name={ questions.data.qset3.name[2] }/>
							  </div>
							</div>

							<div className="field">
								<label className="label">{questions.data.qset3.questions[3]}</label>
							  <div className="control">
							    <div className="select">
							      <select name={ questions.data.qset3.name[3] } onChange={this.handleChange}>
							        <option>Choice of Trip</option>
							        {suitedTrip.map((el, i) => <option key={i}>{el}</option>)}
							      </select>
							   	</div>
								</div>
							</div>

							<div className="field">
								<label className="label">{questions.data.qset3.questions[4]}</label>
							  <div className="control">
							    <div className="select">
							      <select name={ questions.data.qset3.name[4] } onChange={this.handleChange} >
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
	console.log(state, 'inside map form1.....')
	return {
		questions: state
	}
}

export default connect(mapStateToProps)(FormPage1);						