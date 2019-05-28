import React from 'react';
import { Link } from 'react-router-dom';
import General from './crowdsourcedData/General';
import Visa from './crowdsourcedData/Visa';
import Accomodation from './crowdsourcedData/Accomodation';
import Safety from './crowdsourcedData/Safety';
import Experience from './crowdsourcedData/Experience';

const URL = "http://localhost:8000/api/v1";

class Tabs extends React.Component{
	constructor () {
    super()
    this.state = {
      isHidden: true,
      innerText: ''
    }
  }

  componentDidMount = () => {
  	fetch(`${URL}/public-data`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('jwt')
      },
    }).then(res => res.json()).then(d => console.log(d))			
	}

	toggleComponent =(e) => {
		console.log(e.target.innerText)
		this.setState({
			isHidden: !this.state.isHidden,
			innerText: e.target.innerText
		})
	}

	render(){
		const {isHidden, innerText} = this.state
		return(
			<div>
				<div className="tabular">
				  <ul>
				    <li onClick={this.toggleComponent}>General</li>
				    <li onClick={this.toggleComponent}>Visa</li>
				    <li onClick={this.toggleComponent}>Accomodation</li>
				    <li onClick={this.toggleComponent}>Safety</li>
				    <li onClick={this.toggleComponent}>Experience</li>
				  </ul>
				</div>

				<div className="onclick-display-main">
					<div className="onclick-display">
					  {innerText === 'General' ? !isHidden && <General /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Visa' ? !isHidden && <Visa /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Accomodation' ? !isHidden && <Accomodation /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Safety' ? !isHidden && <Safety /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Experience' ? !isHidden && <Experience /> : null}
					</div>
				</div>
			</div>
			)
	}
}

export default Tabs;