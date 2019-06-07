import React from 'react';
import UserProfile from './UserProfile';
import CountryProfile from './CountryProfile';
import { URL } from '../utils/static';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';


class SourcedForm extends React.Component{
  constructor(props) {
    super(props);
		this.state = {};
  }

  handleCountry = (id) => {
  	fetch(`${URL}/public-data/${id}`)
		.then(res => res.json())
		.then(data => {
			this.props.dispatch({
				type: "SHOW_COUNTRY",
				data: data.data
			})
			this.props.history.push(`/${ data.data.country }`);
		})
  }

	render(){
		const data = this.props.crowdsourced ? this.props.crowdsourced.data : null;
		return(
				<div>
					<div style={{width: '800px', margin: '0 auto'}}>
						<h2 style={{textAlign:'left', marginTop: '40px'}}>Below are the countries for which you have contributed</h2>
					</div>
					<div className="dash-flex">
		        <UserProfile />
						<div className="wrapper">
							<div className="main-grid">
							{ this.props.crowdsourced ?
									data.map((d, i) =>
										<div key={i} style={{ cursor:'pointer'}} onClick={() => this.handleCountry(d._id)} className="big-box bg1">{d.country}
										</div> 
									)
								: null
							}
							</div>
						</div>
					</div>
				</div>
					)
			}
}

function mapStateToProps(state){
	return{
    crowdsourced: state.Crowdsourced.data
	}
}

export default withRouter(connect(mapStateToProps)(SourcedForm));