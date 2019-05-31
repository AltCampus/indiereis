import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
// import Form from './Form';

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

const mapStateToProps = (state) => {
	return {
		data: state
	}
}

export default connect(mapStateToProps)(About);
