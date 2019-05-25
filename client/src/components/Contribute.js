import React from 'react';
import FormPage1 from './FormPage1';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {User} from '../reducers/User';

const countries = ['Thailand','Japan','Singapore','Malaysia','Indonesia','Bhutan','China','Vietnam','Nepal', 'Australia', 'Myanmar', 'HongKong','Cambodia'];


class Contribute extends React.Component{
	constructor() {
		super()
	}

	setCountry = (e) => {
		// console.log(e.target.value)
		this.props.dispatch({
			type: 'SET_COUNTRY',
			data: e.target.value
		})
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
									      <select onChange={this.setCountry}>
									        <option>Pick Country</option>
									        {countries.map((el, i) => <option key={i}>{el}</option>)}
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
								<Link to="/form/page1" className="button is-primary">Continue</Link>
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

