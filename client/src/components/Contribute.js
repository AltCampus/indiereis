import React from 'react';
import FormPage1 from './FormPage1';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {User} from '../reducers/User';
// import {handleSubmit} from '../container/methods';

const countries = ['Thailand','Japan','Singapore','Malaysia','Indonesia','Bhutan','China','Vietnam','Nepal', 'Australia', 'Myanmar', 'HongKong','Cambodia'];
const kindOfTrip = ['Solo', 'Couple', 'Family', 'Group', 'Company Trip'];

class Contribute extends React.Component{
	constructor() {
		super()
		// this.state = {
		// 	"country": "",
		// 	"kindOfTrip": ""
		// }
	};

	handleChange = (e) => {
		const { name, value } = e.target;
    this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if(this.state){
			this.props.dispatch({
	      type:"ADD_USER_DATA",
	      data: this.state
	    })
	    this.setState({});
		}else {console.log("state is empty")}
	}

	
	render(){
		const {loggeduser} = this.props;
		return(
			<div>
				<NavBar />
				{loggeduser.isAuthInProgress ? 

					(<div className="is-small contribute">
						<div>Thank you for showing interest in contributing to the project.</div>
						<Link to="/login" className="button is-primary">Login</Link>
					</div>)
					
					: loggeduser.isAuthenticated ?

							(<div className="is-small contribute">
								<div>Thank you for showing interest in contributing to the project.</div>
								<div className="field">
								<div className="form-wrapper">
									<div className="field">
									  <label className="label">Which country did you travel to?</label>
									  <div className="control">
									    <div className="select">
									      <select name="country" onChange={this.handleChange}>
									        <option>Pick Country</option>
									        {countries.map((el, i) => <option key={i}>{el}</option>)}
									      </select>
									    </div>
									  </div>
									</div>

									<div className="field">
									  <label className="label">What kind of trip did you take?</label>
									  <div className="control">
									    <div className="select">
									      <select name="kindOfTrip" onChange={this.handleChange}>
									        <option>Kind of Trip</option>
									        {kindOfTrip.map((el, i) => <option key={i}>{el}</option>)}
									      </select>
									    </div>
									  </div>
									</div>
								</div>
									  {/*<div className="control">
									    <label className="checkbox parallel" >
									      <input type="checkbox" className="terms" />
									      <div className="terms">I agree to the <Link to="#">terms and conditions</Link></div>
									    </label>
									  </div>*/}
									</div>
								<Link to="/form/page1" className="button is-primary" onClick={this.handleSubmit}>Continue</Link>
							</div>)
						
						: null
				}
				<Footer />
			</div>
		)
	}
}

function mapStateToProps(state){
	// console.log(state, 'inside contribute')
	return {
		loggeduser: state.User
	}
}

export default connect(mapStateToProps)(Contribute);

