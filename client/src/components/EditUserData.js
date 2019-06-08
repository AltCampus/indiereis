import React, { Component } from 'react';
import CountryProfile from './CountryProfile';
import { URL } from '../utils/static';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Footer from './Footer';
import NavBar from './NavBar';
import UserDash from './UserDash';

class EditUserData extends Component {

	constructor(props){
		super(props)
		this.state = this.props.country;
	}

	handleUpdate = (e, id) => {
		if(id){
	  	var token = localStorage.getItem("jwt");
			fetch(`${ URL }/public-data/update/${ id }`, {
				method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
        body: JSON.stringify(this.state),
      })
			.then(res => res.json())
			.then(data => {
  			console.log(data, "updated");
				this.props.history.push('/dashboard');
  		})
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		var country = this.props.country;
		return (
			<React.Fragment>
				<NavBar />
				<UserDash />
				<div style={{ width: "600px", margin:"0 auto", boxShadow: "3px 3px 6px 2px rgba(0,0,0,0.4)", padding:'20px' }}>
				
					{
						country && typeof(country) === "object" ? 
							Object.keys(country).filter( v => v !== "userId" && v !== "__v" && v !== "_id"&& v !== "createdAt" && v !== "updatedAt").map((key,i) => {
								return (
									<div key={i} style={{ width: "400px", textAlign: 'left'}}>
										<div style={{ padding :'5px 0', display: 'flex', justifyContent:'space-between' }}>
											 <label style={{ fontSize:'16px', fontWeight:'bold'}}>{key.toUpperCase()}:</label>
											 <input style={{ display:'block', fontSize:'14px', fontWeight:'bold', borderBottom: "1px solid rgba(0,0,0,0.5)", padding:'3px 8px' }} value={ this.state[key] } name={ key } onChange={this.handleChange}/>
										</div>
									</div>
								)
							})
						: null
					}
					<button className="update-btn" onClick={(e) => this.handleUpdate(e, country._id) }>Update</button>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

function mapStateToProps(state){
	return {
		country: state.Country.countryName,
	}
}

export default withRouter(connect(mapStateToProps)(EditUserData));

