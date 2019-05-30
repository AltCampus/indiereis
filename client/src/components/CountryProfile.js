import React from 'react';
import Header from './Header';
import UserProfile from './UserProfile';
import Tabs from './Tabs';
import { URL } from '../utils/static';

class CountryProfile extends React.Component{

	render(){
		return(
			<div>
				<Header />
				<div className="dash-flex" style={{marginTop: '40px'}}>
					<UserProfile />
					<Tabs />
				</div>
			</div>
			)
	}
}

export default CountryProfile;

