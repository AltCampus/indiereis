import React from 'react';
import { URL } from '../utils/static';
import Header from './Header';
import {connect} from 'react-redux';
import CountryModal from './CountryModal';
import {Link, withRouter} from 'react-router-dom';

class Discover extends React.Component{
	constructor(){
		super()
		this.state= {
			showDetails : false
		}
	}
	
	componentDidMount = () => {
		fetch(`${URL}/country`, {
	      headers: {
	        "Content-Type": "application/json"
	      },
		}).then(res => res.json()).then(data => {
			this.props.dispatch({
				type: 'SHOW_SCRAPPED_COUNTRIES',
				data : data.data[0]
			})
		})
	}

	handleCountry = (name) => {
		// var path = e.target.innerText
		this.props.dispatch({
  		type: 'DISCOVER_COUNTRY_NAME',
  		payload: name
  	})
		this.props.history.push('/discover/'+name)
		// this.setState({
		// 	showDetails: !this.state.showDetails
		// })
	}

	render(){
		const data = this.props.scrappedCountries || null

		return(
			<div>
				<Header />
				{
					data && data.country ? data.country.slice(0,100).map((v, i) => {
						return (	
							<div key={i} className ="country-container">
								<div className="container-main">
									<div className="visa-head">
										<div className="container-head">
											<img src={v.flag} alt="flag" />
												<p onClick={() => this.handleCountry(v.name)}>{v.name}</p>
										</div>
									<p className="visa-btn">{v.Visa_Requirement}</p>
									</div>
								<p className="country-notes">{v.notes}</p>
								</div>
							</div>
						)
					}): null
				}
			</div>
			)
	}


}

function mapStateToProps(state){
	return {
		scrappedCountries: state.Country.data
	}
}

export default withRouter(connect(mapStateToProps)(Discover));