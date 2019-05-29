import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {User} from '../reducers/User';

class MainProfile extends React.Component{
	render(){
		return(
				<div>
					<Header />
					<h2 style={{margin: '1rem 9rem'}}>Profile Settings</h2>
					<div className="profile-flex onclick-display-main">
						<div className="profile-name">
							<input type="text" placeholder="First name" value="" name="firstName" />
							<input type="text" placeholder="Last name" value="" name="lastName" />
						</div>
						<input type="email" placeholder="Email" value="" name="email" readonly/>
						<input type="text" placeholder="Username" value="" name="name" />
						<input type="number" placeholder="Phone Number" value="" name="phoneNumber" />
						<input type="date" placeholder="Date of Birth" value="" name="dob" />
						<input type="file" placeholder="Upload new profile image" value="" name="photo" />		
						<button type="submit" className="btn-standard">Save</button>
					</div>
				</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    loggeduser: state
  };
}

export default connect(mapStateToProps)(MainProfile);