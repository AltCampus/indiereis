import React from 'react';
import { Link } from 'react-router-dom';
import General from './crowdsourcedData/General';
import Visa from './crowdsourcedData/Visa';
import Flights from './crowdsourcedData/Flights';
import Safety from './crowdsourcedData/Safety';
import Experience from './crowdsourcedData/Experience';
import {connect} from 'react-redux';
import { URL } from '../utils/static';

class Tabs extends React.Component{
	constructor (props) {
    super(props)
    this.state = {
    	formData: '',
      isHidden: true,
      innerText: '',
      isdefault: true,
    }
  }

	toggleComponent =(e) => {
		// console.log(e.target.innerText)
		this.setState({
			innerText: e.target.innerText,
			isdefault: this.state.default
		})
	}

	render(){
		// console.log(this.state)
		const {innerText, isdefault} = this.state
		return(
			<div>
				<div className="tabular">
				  <ul>
				    <li onClick={this.toggleComponent}>General</li>
				    <li onClick={this.toggleComponent}>Visa</li>
				    <li onClick={this.toggleComponent}>Flights</li>
				    <li onClick={this.toggleComponent}>Safety</li>
				    <li onClick={this.toggleComponent}>Experience</li>
				  </ul>
				</div>

				<div className="onclick-display-main">
					<div className="onclick-display">
					  {isdefault ? <General /> : innerText === 'General' ? <General /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Visa' ? !isdefault && <Visa /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Flights' ? !isdefault && <Flights /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Safety' ? !isdefault && <Safety /> : null}
					</div>
					<div className="onclick-display">
					  {innerText === 'Experience' ? !isdefault && <Experience /> : null}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log(state, 'inside map')
  return {
    crowdsourced: state.Crowdsourced.data
  };
}

export default connect(mapStateToProps)(Tabs);