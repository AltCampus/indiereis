import React from 'react';
import Form from './Form';
import Footer from './Footer';
import NavBar from './NavBar';

class Contribute extends React.Component{
	render(){
		return(
			<div>
				<NavBar />
				<Form />
				<Footer />
			</div>
		)
	}
}

export default Contribute;

