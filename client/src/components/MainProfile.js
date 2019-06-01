import { connect } from 'react-redux';
import React from 'react';
import Header from './Header';
import { URL } from '../utils/static';
const { jwt } = localStorage;
import { upload_preset, cloudName } from "../../../key";

class MainProfile extends React.Component{
  
  state = {
    firstName : this.props.user.user.firstName || null,
    lastName: this.props.user.user.lastName || null,
    name: this.props.user.user.name || null,
    email: this.props.user.user.email || null,
    dob: this.props.user.user.dob || null,
    phoneNumber: this.props.user.user.phoneNumber || null,
    photo: ""
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

	handleFile = (e) => {
    const photo = event.target.files[0];
    const sendImg = (str) => {
      str ? this.setState({ photo: str }) : null;
    }

    // file conversion to base64 using FileReader fn
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result, "base64...");
      sendImg(event.target.result);
    };
    reader.readAsDataURL(photo);
  };


  handleSubmit = async(e) => {
    e.preventDefault();

    if(this.state.photo.startsWith("https://res.cloudinary.com") || !this.state.photo ){
      fetch(`${URL}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": jwt
        },
        body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(data => {
          console.log(data, "profile updated...");
          this.setState({})
          return;
      })
    }else {
      // cloudinary image upload and user update
      var cloudData = { file : this.state.photo, upload_preset: upload_preset };
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cloudData),
        }).then((res) => res.json())
        .then(data => {
          this.setState({ photo: data.secure_url });
          fetch(`${URL}/users/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": jwt
          },
          body: JSON.stringify(this.state),
          })
          .then(res => res.json())
          .then(data => {
            console.log(data, "profile updated...");
            this.setState({})
        })
      })
    }
  }

	render(){
		return( 
      <div>
				<Header />
				<form className="profile-flex onclick-display-main" onSubmit={this.handleSubmit}>
					<div className="profile-name">
						<input type="text" placeholder="First name" onChange={ this.handleChange } value={this.state.firstName} name="firstName" />
						<input type="text" placeholder="Last name" name="lastName" onChange={ this.handleChange } value={this.state.lastName} />
					</div>
					<input type="text" placeholder="Username" name="name" onChange={ this.handleChange } value={this.state.name}/>
					<input type="email" placeholder="Email" name="email" onChange={ this.handleChange } value={this.state.email} readOnly />
					<input type="number" placeholder="Phone Number" name="phoneNumber" onChange={ this.handleChange } value={this.state.phoneNumber} />
					<input type="date" placeholder="Date of Birth" name="dob" onChange={ this.handleChange } value={this.state.dob} />
					<input type="file" placeholder="Upload new profile image" name="photo" onChange={ this.handleFile } />		
					<button type="submit" className="btn-standard">Save</button>
				</form>
  		</div> 
    )
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.User.user,
	}
}

export default connect(mapStateToProps)(MainProfile);