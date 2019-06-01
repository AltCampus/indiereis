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
      innerText: ''
    }
  }

  componentDidMount = () => {
  	fetch(`${URL}/public-data`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('jwt')
      },
    }).then(res => res.json()).then(data => {
    	this.props.dispatch({
    		type: 'SHOW_FORM_DATA',
    		formData: data
    	});
    })			
	}

	toggleComponent =(e) => {
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
				    <li onClick={this.toggleComponent}>Flights</li>
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
					  {innerText === 'Flights' ? !isHidden && <Flights /> : null}
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

function mapStateToProps(state) {
  return {
    crowdsourced: state.Crowdsourced.data
  };
}

export default connect(mapStateToProps)(Tabs);