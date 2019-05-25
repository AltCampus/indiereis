import React from 'react';
import Header from './Header';
import Footer from './Footer';

class About extends React.Component {
	render(){
		return(
			<React.Fragment>
				<Header />
				<div className="about-main">
					<p className="about-info">More coming sooon!</p>
				</div>
				<Footer />
			</React.Fragment>
		)
	}
}

export default About;