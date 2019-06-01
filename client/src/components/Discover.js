import React from 'react';
import { URL } from '../utils/static';
import Header from './Header';
import {connect} from 'react-redux';

class Discover extends React.Component{
	
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
											<p>{v.name}</p>
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

export default connect(mapStateToProps)(Discover);