import React from 'react';
import FormPage1 from './FormPage1';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {User} from '../reducers/User'

class Contribute extends React.Component{
	constructor() {
		super()
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
									  <div className="control">
									    <label className="checkbox parallel" >
									      <input type="checkbox" className="terms" />
									      <div className="terms">I agree to the <Link to="#">terms and conditions</Link></div>
									    </label>
									  </div>
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
	return {
		loggeduser: state.User
	}
}

export default connect(mapStateToProps)(Contribute);

