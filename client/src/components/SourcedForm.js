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

  handleCountry = (e, id) => {
  	const text = e.target.classList;
  	if(text.contains("edit") || text.contains("edit")){
  		console.log(text,'text')
  	}else {
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
  }

  handleUpdate = (e, id) => {
  	var token = localStorage.getItem("jwt");
  	const text = e.target.classList;
  	if(text.contains("edit")){
  		fetch(`${URL}/public-data/${id}`)
			.then(res => res.json())
			.then(data => {
  			console.log(data, "edit");
				this.props.dispatch({
					type: "SHOW_COUNTRY",
					data: data.data
				})
				this.props.history.push("/edit-data");
			})
  	}else if(text.contains("delete")){
  		fetch(`${ URL }/public-data/delete/${ id }`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        }})
			.then(res => res.json())
			.then(data => {
  			console.log(data, "deleted");
				this.props.history.push('/dashboard');
  		})
	  }
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
							{ 
								this.props.crowdsourced ?
									data.map((d, i) => {
										return (
											<div key={i} className="country-card" style={{ cursor:'pointer'}} onClick={(e) => this.handleCountry(e,d._id)} className="big-box bg1">
												<p className="btn-box" style={{ display:'flex', justifyContent:'space-between' }}>
													<span className="btn-icon" onClick={ (e) => this.handleUpdate(e, d._id) }><i className="fas fa-pencil-alt edit"></i></span>
													<span className="btn-icon" onClick={ (e) => this.handleUpdate(e, d._id) }><i className="fas fa-trash-alt delete"></i></span>
												</p>
												<h2 style={{ position: 'absolute', top: "50%", left: "50%", transform:'translate(-50%, -50%)' }}>{d.country}</h2>
											</div>
										) 
									})
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