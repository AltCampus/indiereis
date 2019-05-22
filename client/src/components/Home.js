import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import CountryInput from './CountryInput';

class Home extends React.Component{
	render(){
		return(
			<React.Fragment>
				<Header />
        <Hero />
        <CountryInput />
        <Footer />
			</React.Fragment>
		)
	}
}

export default Home;