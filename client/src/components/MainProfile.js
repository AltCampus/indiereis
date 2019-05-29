import React from 'react';
import Header from './Header';

class MainProfile extends React.Component{
	render(){
		return(
				<div>
					<Header />
					<div className="profile-flex onclick-display-main">
						<div className="profile-name">
							<input type="text" placeholder="First name" value="" name="firstName" />
							<input type="text" placeholder="Last name" value="" name="lastName" />
						</div>
						<input type="text" placeholder="Username" value="" name="username" />
						<input type="number" placeholder="Phone Number" value="" name="phoneNumber" />
						<input type="date" placeholder="Date of Birth" value="" name="dob" />
						<input type="file" placeholder="Upload new profile image" value="" name="photo" />		
						<button type="submit" className="btn-standard">Save</button>
					</div>
				</div>
			)
	}
}

export default MainProfile;